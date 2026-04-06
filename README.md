# Pipeline — Claude Code Automation for CDKTF Azure Modules

This repository demonstrates how **Claude Code** can automate infrastructure workflows using GitHub Actions.
It is used to justify the value of a Claude Code subscription to management by showing end-to-end automation
of CDKTF Azure module upgrades — with zero manual code changes.

---

## What This Repo Does

When a developer triggers the GitHub Actions workflow, **Claude Code**:

1. Checks if the user provided a provider version — if not, fetches the latest from **Terraform Registry via MCP**
2. Reads the existing CDKTF Azure module (TypeScript + Terraform)
3. Understands the old code structure
4. Automatically upgrades the provider version
5. Fixes all breaking changes and deprecated arguments using real data from Terraform Registry
6. Commits the changes to a new branch
7. Opens a Pull Request with a full summary of what was changed

**No human writes a single line of code. Claude Code does it all.**

---

## Repository Structure

```
Pipeline/
├── .github/
│   └── workflows/
│       └── cdktf-azure-updater.yml   ← GitHub Actions workflow
├── .claude-plugin/
│   ├── plugin.json                   ← Claude Code plugin metadata
│   └── marketplace.json              ← Plugin marketplace registry
├── skills/
│   └── cdktf-azure-updater/
│       ├── SKILL.md                  ← Claude Code skill (10-step workflow)
│       └── references/
│           └── workflow.md           ← Error fixes & module-specific notes
├── demo/
│   └── 17_Azure_ACR/
│       ├── main.ts                   ← Old CDKTF TypeScript (before upgrade)
│       ├── cdktf.json                ← Old provider version (azurerm ~>2.0.0)
│       ├── tsconfig.json             ← TypeScript config
│       └── package.json              ← Node.js dependencies
└── README.md
```

---

## How the GitHub Actions Workflow Works — Full Picture

### Trigger

The workflow is manually triggered via **GitHub Actions → Run workflow**.

You provide two inputs:

| Input | Description | Required |
|---|---|---|
| `module_path` | Path to the module folder in this repo | Yes (default: `demo/17_Azure_ACR`) |
| `provider_version` | Target azurerm version (e.g. `4.64.0`) | **No — leave empty to auto-fetch latest from Terraform Registry** |

---

### Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                   DEVELOPER                                     │
│  Goes to GitHub Actions → clicks "Run workflow"                 │
│  Enters module path + version (or leaves version empty)         │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 1: Checkout Repository                                    │
│  actions/checkout@v4                                            │
│  → Clones the repo into the GitHub Actions runner              │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 2: Claude Code runs                                       │
│  anthropics/claude-code-action@beta  (mode: agent)             │
│                                                                 │
│  Claude Code has access to:                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Built-in Tools        │  Terraform MCP Server          │   │
│  │  ─────────────────     │  ──────────────────────────    │   │
│  │  Read  → reads files   │  get_latest_provider_version   │   │
│  │  Edit  → edits files   │  get_provider_details          │   │
│  │  Grep  → finds patterns│  get_provider_capabilities     │   │
│  │  Glob  → finds files   │                                │   │
│  │  Bash  → runs commands │  Source: registry.terraform.io │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ── SUB-STEP 0: Determine Provider Version ──                   │
│                                                                 │
│    Did user provide a version?                                  │
│         │                                                       │
│    YES ─┤─ Use that exact version (e.g. 4.64.0)               │
│         │                                                       │
│    NO  ─┤─ Call Terraform MCP:                                 │
│         │    get_latest_provider_version(                       │
│         │      namespace="hashicorp",                          │
│         │      type="azurerm"                                  │
│         │    )                                                  │
│         │    → Fetches latest version from Terraform Registry   │
│         │    → Uses that version for all steps below           │
│                                                                 │
│  ── SUB-STEP 1: Update cdktf.json ──                           │
│                                                                 │
│    Read  → demo/17_Azure_ACR/cdktf.json                        │
│    Edit  → "terraformProviders": [                              │
│              "registry.terraform.io/hashicorp/azurerm@4.64.0"  │
│            ]                                                    │
│                                                                 │
│  ── SUB-STEP 2: Check Provider Details via Terraform MCP ──    │
│                                                                 │
│    Call get_provider_details(                                   │
│      namespace="hashicorp",                                     │
│      type="azurerm",                                            │
│      version="4.64.0"                                           │
│    )                                                            │
│    → Terraform Registry returns full provider documentation     │
│    → Claude identifies deprecated/removed arguments             │
│                                                                 │
│  ── SUB-STEP 3: Fix main.ts imports ──                         │
│                                                                 │
│    Read → demo/17_Azure_ACR/main.ts                            │
│    Grep → finds "@cdktf/provider-azurerm"                      │
│    Edit → fixes import paths:                                   │
│                                                                 │
│    BEFORE:                                                      │
│    import { AzurermProvider, ContainerRegistry }               │
│      from "@cdktf/provider-azurerm"                            │
│                                                                 │
│    AFTER:                                                       │
│    import { AzurermProvider }                                   │
│      from "./.gen/providers/azurerm/provider"                  │
│    import { ContainerRegistry }                                 │
│      from "./.gen/providers/azurerm/container-registry"        │
│                                                                 │
│  ── SUB-STEP 4: Fix deprecated arguments ──                    │
│                                                                 │
│    Using info from Terraform Registry (SUB-STEP 2):            │
│                                                                 │
│    Edit → retentionPolicy:[{days, enabled}]                    │
│            → retentionPolicyInDays: number                     │
│    Edit → features: {}  →  features: [{}]                      │
│    Edit → Removes Retention_Policy_Enabled variable            │
│    Edit → Any other deprecations found from registry data      │
│                                                                 │
│  ── SUB-STEP 5: Fix tsconfig.json ──                           │
│                                                                 │
│    Edit → removes "charset": "utf8" (deprecated in TS 5.x)    │
│                                                                 │
│  ── SUB-STEP 6: Print Summary ──                               │
│                                                                 │
│    Prints to GitHub Actions log:                               │
│    - Version used + source (user or registry)                  │
│    - Files changed                                              │
│    - Exact changes made per file                               │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 3: Show git diff                                          │
│  → Prints exact line-by-line changes in the Actions log        │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 4: Commit and Push to new branch                         │
│                                                                 │
│  Branch name:                                                   │
│  claude/cdktf-update-4.64.0-20260407120000                     │
│                                                                 │
│  Commit message:                                                │
│  "chore: upgrade demo/17_Azure_ACR to azurerm 4.64.0          │
│   via Claude Code"                                              │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 5: Create Pull Request automatically                      │
│                                                                 │
│  PR Title:                                                      │
│  "chore: upgrade demo/17_Azure_ACR to azurerm 4.64.0"         │
│                                                                 │
│  PR Body includes:                                              │
│  ✔ Module name and version                                      │
│  ✔ Version source (user-specified or auto-fetched from registry)│
│  ✔ List of all changes made by Claude Code                      │
│  ✔ Credit to Claude Code + Terraform Registry MCP              │
└─────────────────────────────────────────────────────────────────┘
```

---

## Where Does Information Come From?

```
┌──────────────────────────────────────────────────────┐
│  Information Source         What Claude reads        │
│  ─────────────────────      ─────────────────────    │
│  Your GitHub repo     →     main.ts, cdktf.json,    │
│                             tsconfig.json            │
│                                                      │
│  Terraform Registry   →     Latest provider version  │
│  (via MCP server)           Provider documentation   │
│                             Deprecated arguments     │
│                             Breaking changes         │
│                                                      │
│  Your workflow input  →     module_path              │
│                             provider_version         │
└──────────────────────────────────────────────────────┘
```

**Anthropic API receives:** your prompt + file contents only
**Terraform Registry provides:** provider metadata only (no credentials)
**Your secrets stay safe:** Azure credentials are never read or sent anywhere

---

## What Claude Code Changes (Demo Module: 17_Azure_ACR)

| File | Before | After |
|---|---|---|
| `cdktf.json` | `azurerm@~>2.0.0` | `registry.terraform.io/hashicorp/azurerm@4.64.0` |
| `main.ts` | `import from "@cdktf/provider-azurerm"` | `import from "./.gen/providers/azurerm/provider"` |
| `main.ts` | `retentionPolicy:[{days, enabled}]` | `retentionPolicyInDays: number` |
| `main.ts` | `features: {}` | `features: [{}]` |
| `main.ts` | `Retention_Policy_Enabled` variable present | Removed (not supported in azurerm 4.x) |
| `tsconfig.json` | `"charset": "utf8"` present | Removed |

---

## Claude Code Plugin (Local Use)

This repo also works as a **Claude Code plugin** for local interactive use.

### Install

```bash
claude plugin marketplace add https://github.com/Vshwas/Pipeline
claude plugin install cdktf-azure-updater
```

### Use

```
"Update the 12_Azure_AKS module to azurerm 4.64.0"
"Upgrade the Storage Account module — fetch latest version from registry"
"Run cdktf synth for App Service Plan module"
```

Claude follows all 10 steps automatically — update `cdktf.json`, fix imports,
fix deprecated args, run `cdktf synth`, create `var.tfvars`, run `terraform plan`,
and produce a validated `cdk.tf.json`.

---

## Prerequisites

| Requirement | Where to set it |
|---|---|
| `ANTHROPIC_API_KEY` | GitHub → Settings → Secrets → Actions |
| `GITHUB_TOKEN` | Automatically provided by GitHub Actions |
| Anthropic account credits | console.anthropic.com/settings/billing |

---

## Why Claude Code?

| Task | Manual | With Claude Code |
|---|---|---|
| Find breaking changes between azurerm versions | Read Terraform docs manually | Claude reads Terraform Registry via MCP automatically |
| Update 35 Azure modules | Days of developer time | One workflow run per module |
| Fix deprecated arguments | Risk of missing some | Claude checks every argument against registry data |
| Validation | Manual testing | cdktf synth + terraform plan built into the skill |
| Audit trail | None | Every change is a reviewed Pull Request |
| Version management | Hardcoded by developer | User chooses version or Claude fetches latest automatically |

> This repository is a proof-of-concept demonstrating Claude Code's ability to automate
> real-world infrastructure upgrade workflows end-to-end, connected to live data from
> the Terraform Registry via MCP.
