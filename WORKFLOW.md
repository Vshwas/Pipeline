# CDKTF Azure Module Updater — Workflow Documentation

This document explains every step of the GitHub Actions workflow
`cdktf-azure-updater.yml` — what it does, why it exists, and what output it produces.

---

## How to Trigger

Go to **GitHub → Actions → CDKTF Azure Module Updater → Run workflow**

| Input | Required | Example | Description |
|---|---|---|---|
| `module_path` | Yes | `demo/17_Azure_ACR` | Path to the CDKTF module folder inside this repo |
| `provider_version` | No | `4.64.0` | Leave empty to auto-fetch latest from Terraform Registry |
| `release_tag` | No | `v1` | Git tag to create after a successful run (v1, v2, v3…) |

---

## Workflow Steps

---

### STEP 1 — Checkout Repository
```yaml
uses: actions/checkout@v4
```
**What it does:** Clones this GitHub repository into the Actions runner (a temporary Ubuntu VM).

**Why:** All file edits, synth runs, and commits happen inside this cloned copy.

---

### STEP 2 — Setup Node.js
```yaml
uses: actions/setup-node@v4
node-version: '18'
```
**What it does:** Installs Node.js 18 on the runner.

**Why:** CDKTF CLI and TypeScript tools (`ts-node`, `typescript`) require Node.js to run.

---

### STEP 3 — Install Terraform CLI
```yaml
uses: hashicorp/setup-terraform@v3
terraform_version: "1.9.0"
```
**What it does:** Installs Terraform 1.9.0 on the runner.

**Why:** Needed later for `terraform init` and `terraform plan` to validate the generated `cdk.tf.json`.

---

### STEP 4 — Install CDKTF CLI
```bash
npm install -g cdktf-cli@0.20.12 typescript ts-node
```
**What it does:** Installs the CDKTF CLI (v0.20.12), TypeScript compiler, and `ts-node` globally.

**Why:**
- `cdktf` CLI is needed to run `cdktf synth` which compiles `main.ts` → `cdk.tf.json`
- Version is pinned to `0.20.12` to match the library version in `package.json`
- `ts-node` executes TypeScript directly without a separate compile step

---

### STEP 5 — Install Module Dependencies and Generate Provider Bindings
```bash
npm install
cdktf get
```
**What it does:**
- `npm install` — downloads all Node.js dependencies listed in `package.json`
- `cdktf get` — downloads the azurerm Terraform provider and generates TypeScript bindings under `.gen/providers/azurerm/`

**Why:** The `.gen/` folder contains TypeScript interfaces (`ContainerRegistryConfig`, `AzurermProviderFeatures`, etc.) that Claude reads to know which properties are valid in each resource. Without this, Claude would be guessing property names.

> `continue-on-error: true` — if this step fails (e.g. network issue), the workflow continues. Claude will handle it.

---

### STEP 6 — Run Claude Code (AI Agent)
```yaml
uses: anthropics/claude-code-action@beta
claude_code_oauth_token: ${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}
mode: agent
```
**What it does:** Runs Claude Code as an AI agent that autonomously reads and edits files. Claude is given a 6-step prompt:

#### SUB-STEP 0 — Determine Provider Version
- If user provided a version → use it
- If empty → call `mcp__terraform__get_latest_provider_version` to fetch the latest azurerm version from Terraform Registry

#### SUB-STEP 1 — Update cdktf.json
- Sets `"terraformProviders"` to `"registry.terraform.io/hashicorp/azurerm@<version>"`

#### SUB-STEP 2 — Check Provider Details via Terraform MCP
- Calls `mcp__terraform__get_provider_details` to get full provider documentation
- Identifies deprecated/removed arguments in the new version

#### SUB-STEP 3 — Fix main.ts Imports
- Replaces old `@cdktf/provider-azurerm` monolith imports with `.gen/` sub-path imports
  - e.g. `import { ContainerRegistry } from "./.gen/providers/azurerm/container-registry"`
- Required because `@cdktf/provider-azurerm` was deprecated on December 10, 2025

#### SUB-STEP 4 — Fix Deprecated Arguments
- Reads `.gen/providers/azurerm/container-registry/index.ts` to get the exact list of valid properties
- Removes any property from `ContainerRegistry` block that no longer exists in the type
- Removes the corresponding `TerraformVariable` declarations for unused variables
- Sets `features: [{}] as any` (azurerm 4.x expects an array type)

#### SUB-STEP 5 — Fix tsconfig.json
- Removes `"charset": "utf8"` which is deprecated in TypeScript 5.x

#### SUB-STEP 6 — Print Summary
- Lists every file changed, every property removed, and every variable removed

**Auth:** Uses `CLAUDE_CODE_OAUTH_TOKEN` (Claude.ai subscription) — no API cost per run.

**MCP Server:** Terraform Registry MCP (`@hashicorp/mcp-terraform-registry`) provides live provider data. No credentials required — it reads public registry metadata only.

---

### STEP 7 — Run cdktf synth (Generate cdk.tf.json)
```bash
cdktf synth
```
**What it does:** Compiles the updated `main.ts` TypeScript → `cdk.tf.json` Terraform JSON.

**Why:** `cdk.tf.json` is the final deliverable — the Terraform-compatible JSON configuration that gets deployed. This step also validates that all TypeScript compiles without errors.

**Output location:** `cdktf.out/stacks/<stack-name>/cdk.tf.json`

**Verification:** Checks the file exists and is valid JSON. Fails the pipeline if not found.

---

### STEP 8 — Generate variables.tf and var.tfvars
```bash
python3 scripts/generate_variables_tf.py "$CDK_JSON"
python3 scripts/generate_tfvars.py "$CDK_JSON"
```
**What it does:**
- `generate_variables_tf.py` — reads all `variable` blocks from `cdk.tf.json` and writes a proper HCL `variables.tf` file
- `generate_tfvars.py` — generates `var.tfvars` with sample values of the correct type for each variable

**Why:**
- `variables.tf` — standard Terraform variable definitions file, used when applying the module
- `var.tfvars` — sample values needed to run `terraform plan` without real credentials
- Both files are committed to the PR for reviewers and future deployments

**Example output (variables.tf):**
```hcl
variable "Resource_Group_Name" {
  type        = string
  description = "Required$Resource group name required here"
}

variable "Admin_Enabled" {
  type        = bool
  description = "Optional$Specifies whether the admin user is enabled"
  default     = false
}
```

---

### STEP 9 — Terraform Init and Plan (Validate without Backend)
```bash
terraform init -backend=false
terraform plan -var-file="var.tfvars" -input=false -no-color
```
**What it does:**
- `terraform init -backend=false` — initialises Terraform providers without connecting to the Azure backend (no credentials needed)
- `terraform plan` — dry-runs the infrastructure changes against the generated `cdk.tf.json` using sample variable values

**Why:** Validates that the generated Terraform JSON is structurally correct and the provider accepts all resource configurations. Catches errors that `cdktf synth` (TypeScript compilation) cannot catch — e.g. invalid resource argument combinations.

> Uses `|| echo "::warning::"` — plan warnings don't fail the pipeline, only errors do.

---

### STEP 10 — Final cdktf synth with Backend
```bash
cdktf synth
```
**What it does:** Runs `cdktf synth` a final time to regenerate `cdk.tf.json` with the backend configuration fully included.

**Why:** The final `cdk.tf.json` committed to the PR must include the `AzurermBackend` block (storage account, container, key) so the deployed Terraform knows where to store state.

---

### STEP 11 — Show git diff
```bash
git diff
```
**What it does:** Prints all file changes in the Actions log.

**Why:** Provides a human-readable audit trail of every line Claude changed — visible in the GitHub Actions run log without needing to check out the branch.

---

### STEP 12 — Commit and Push Changes
```bash
git checkout -b claude/cdktf-update-<version>-<timestamp>
git add main.ts cdktf.json tsconfig.json variables.tf var.tfvars .gitignore
git add -f cdktf.out/stacks/.../cdk.tf.json
git commit -m "chore: upgrade <module> to azurerm <version> via Claude Code"
git push origin <branch>
```
**What it does:** Creates a new branch and commits only the relevant files.

**Files committed:**

| File | Why |
|---|---|
| `main.ts` | Updated TypeScript with fixed imports and arguments |
| `cdktf.json` | Updated provider version |
| `tsconfig.json` | Removed deprecated `charset` option |
| `variables.tf` | Generated HCL variable definitions |
| `var.tfvars` | Sample variable values |
| `cdk.tf.json` | **The main output** — Terraform JSON ready for deployment |
| `.gitignore` | Excludes `cdktf.out/`, `.gen/`, `node_modules/` from future commits |

> `git add -f` is used for `cdk.tf.json` to force-add it even though `cdktf.out/` is in `.gitignore`.

---

### STEP 13 — Create Pull Request
```yaml
uses: actions/github-script@v7
```
**What it does:** Automatically creates a GitHub Pull Request from the new branch to `master`.

**PR includes:**
- Module name and provider version
- Version source (user-specified or auto-fetched from registry)
- List of all changes made by Claude Code

**Prerequisite:** Repository setting **"Allow GitHub Actions to create and approve pull requests"** must be enabled under Settings → Actions → General → Workflow permissions.

---

### STEP 14 — Create Release Tag (Optional)
```bash
git tag -a "v1" -m "Release v1 — azurerm 4.64.0 (demo/17_Azure_ACR)"
git push origin "v1"
```
**What it does:** Creates an annotated git tag on master marking this version of the module upgrade.

**Why:** Allows you to track which version of the module corresponds to which azurerm provider version upgrade. Tags are visible in GitHub → Code → Tags.

**Only runs if:** `release_tag` input is non-empty (e.g. `v1`, `v2`, `v3`).

> If the tag already exists it is deleted and recreated — safe to re-run with the same tag.

---

## Complete Flow at a Glance

```
Developer clicks "Run workflow" on GitHub Actions
              │
              ▼
    Checkout repo on Ubuntu runner
              │
              ▼
    Install Node.js 18 + Terraform 1.9 + CDKTF CLI
              │
              ▼
    npm install + cdktf get
    (generates .gen/ TypeScript provider bindings)
              │
              ▼
    Claude Code Agent runs
    ├── Fetch latest azurerm version (if not specified)
    ├── Update cdktf.json provider version
    ├── Check provider docs via Terraform MCP
    ├── Fix main.ts imports → .gen/ sub-paths
    ├── Fix deprecated resource properties (reads .gen/ types)
    └── Fix tsconfig.json
              │
              ▼
    cdktf synth → compiles main.ts → cdk.tf.json
              │
              ▼
    Generate variables.tf + var.tfvars
              │
              ▼
    terraform init -backend=false
    terraform plan -var-file=var.tfvars
              │
              ▼
    Final cdktf synth (with backend)
              │
              ▼
    git commit → push → Pull Request created
              │
              ▼
    Git tag created (if release_tag provided)
```

---

## Secrets Required

| Secret | Where to set | Used for |
|---|---|---|
| `CLAUDE_CODE_OAUTH_TOKEN` | GitHub → Settings → Secrets → Actions | Authenticates Claude Code (uses subscription, no API cost) |
| `GITHUB_TOKEN` | Auto-provided by GitHub Actions | Creating branches, PRs, and tags |

---

## Files in this Repo

| File | Purpose |
|---|---|
| `.github/workflows/cdktf-azure-updater.yml` | The GitHub Actions workflow |
| `scripts/generate_variables_tf.py` | Converts `cdk.tf.json` variables → HCL `variables.tf` |
| `scripts/generate_tfvars.py` | Generates `var.tfvars` with sample values for `terraform plan` |
| `demo/17_Azure_ACR/main.ts` | CDKTF TypeScript source (before upgrade) |
| `demo/17_Azure_ACR/cdktf.json` | CDKTF config with provider version |
| `demo/17_Azure_ACR/tsconfig.json` | TypeScript compiler config |
| `demo/17_Azure_ACR/package.json` | Node.js dependencies |
