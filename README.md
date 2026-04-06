# Pipeline — Claude Code Automation for CDKTF Azure Modules

This repository demonstrates how **Claude Code** can automate infrastructure workflows using GitHub Actions.
It is used to justify the value of a Claude Code subscription to management by showing end-to-end automation
of CDKTF Azure module upgrades — with zero manual code changes.

---

## What This Repo Does

When a developer triggers the GitHub Actions workflow, **Claude Code**:

1. Reads the existing CDKTF Azure module (TypeScript + Terraform)
2. Understands the old code structure
3. Automatically upgrades the provider version
4. Fixes all breaking changes and deprecated arguments
5. Commits the changes to a new branch
6. Opens a Pull Request with a full summary of what was changed

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

## How the GitHub Actions Workflow Works

### Trigger

The workflow is manually triggered via **GitHub Actions → Run workflow**.

You provide two inputs:
| Input | Description | Default |
|---|---|---|
| `module_path` | Path to the module folder in this repo | `demo/17_Azure_ACR` |
| `provider_version` | Target azurerm provider version | `4.64.0` |

---

### Step-by-Step Workflow Execution

```
Developer clicks "Run workflow"
         │
         ▼
┌─────────────────────────────┐
│  Step 1: Checkout Repo      │
│  actions/checkout@v4        │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────┐
│  Step 2: Claude Code runs (anthropics/claude-code-  │
│          action@beta, mode: agent)                  │
│                                                     │
│  Claude reads the module files and performs:        │
│                                                     │
│  ① Update cdktf.json                               │
│     "azurerm@~>2.0.0"                              │
│      → "registry.terraform.io/hashicorp/           │
│         azurerm@4.64.0"                            │
│                                                     │
│  ② Fix main.ts imports                             │
│     "@cdktf/provider-azurerm"                      │
│      → "./.gen/providers/azurerm/provider"         │
│      → "./.gen/providers/azurerm/container-        │
│         registry"                                   │
│                                                     │
│  ③ Fix deprecated arguments                        │
│     retentionPolicy:[{days,enabled}]               │
│      → retentionPolicyInDays: number               │
│     features: {}  →  features: [{}]                │
│     Removes Retention_Policy_Enabled variable      │
│                                                     │
│  ④ Fix tsconfig.json                               │
│     Removes deprecated "charset": "utf8"           │
│                                                     │
│  ⑤ Prints summary of all changes made             │
└────────────┬────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────┐
│  Step 3: Show git diff      │
│  Displays exact file        │
│  changes in the logs        │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────────────────────┐
│  Step 4: Commit & Push to new branch        │
│                                             │
│  Branch name:                               │
│  claude/cdktf-update-4.64.0-<timestamp>    │
│                                             │
│  Commit message:                            │
│  "chore: upgrade demo/17_Azure_ACR to      │
│   azurerm 4.64.0 via Claude Code"          │
└────────────┬────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────┐
│  Step 5: Create Pull Request automatically  │
│                                             │
│  PR Title:                                  │
│  "chore: upgrade demo/17_Azure_ACR to      │
│   azurerm 4.64.0"                          │
│                                             │
│  PR Body includes:                          │
│  - Module name and version                  │
│  - List of all changes made by Claude Code  │
│  - Credit to Claude Code                    │
└─────────────────────────────────────────────┘
```

---

## What Claude Code Changes (Demo Module: 17_Azure_ACR)

| File | What Changed |
|---|---|
| `cdktf.json` | Provider version: `azurerm@~>2.0.0` → `registry.terraform.io/hashicorp/azurerm@4.64.0` |
| `main.ts` | Import paths: `@cdktf/provider-azurerm` → `./.gen/providers/azurerm/provider` and `/container-registry` |
| `main.ts` | `retentionPolicy:[{days, enabled}]` → `retentionPolicyInDays: number` (block removed in azurerm 4.x) |
| `main.ts` | `features: {}` → `features: [{}]` (type changed to array in azurerm 4.x) |
| `main.ts` | Removed `Retention_Policy_Enabled` variable (no longer supported in azurerm 4.x) |
| `tsconfig.json` | Removed `"charset": "utf8"` (deprecated in TypeScript 5.x) |

---

## Claude Code Plugin (Skill)

This repo also contains a **Claude Code plugin** (`cdktf-azure-updater`) that can be installed locally
and used interactively — not just in GitHub Actions.

### Install the Plugin

```bash
claude plugin marketplace add https://github.com/Vshwas/Pipeline
claude plugin install cdktf-azure-updater
```

### Use the Skill Interactively

Once installed, just tell Claude Code:

```
"Update the 12_Azure_AKS module to azurerm 4.64.0"
"Run cdktf synth for App Service Plan module"
"Upgrade the Storage Account module"
```

Claude will automatically follow all 10 steps — update `cdktf.json`, fix imports,
handle deprecated arguments, run `cdktf synth`, create `var.tfvars`, run `terraform plan`,
and produce a validated `cdk.tf.json`.

---

## Prerequisites

| Requirement | Details |
|---|---|
| Anthropic API Key | Add as `ANTHROPIC_API_KEY` in GitHub repo secrets |
| GitHub Token | Automatically provided by GitHub Actions (`GITHUB_TOKEN`) |
| Permissions | `contents: write`, `pull-requests: write`, `id-token: write` |

---

## Why Claude Code?

| Manual Process | With Claude Code |
|---|---|
| Developer reads Terraform docs for breaking changes | Claude reads and understands them automatically |
| Manually update 35+ Azure modules one by one | One workflow run per module, fully automated |
| Risk of missing deprecated arguments | Claude checks and fixes all known breaking changes |
| Hours of testing and debugging | cdktf synth + terraform plan validation built in |
| No audit trail | Every change is a reviewed Pull Request |

> This repository is a proof-of-concept demonstrating Claude Code's ability to automate
> real-world infrastructure upgrade workflows end-to-end.
