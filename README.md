# Pipeline — Claude Code Plugins

This repository contains Claude Code plugins for automating ICA (iCloudAccelerator) infrastructure workflows.

## Plugins

### `cdktf-azure-updater`

Automates the full CDKTF Azure module update workflow:

1. Update `cdktf.json` provider version
2. `npm install` + `npm run get`
3. Fix `main.ts` imports to use `.gen/` paths
4. Comment out backend for local testing
5. `cdktf synth`
6. Create `var.tfvars` with sample values
7. `terraform init` + `terraform plan`
8. Uncomment backend → final `cdktf synth`

**Trigger phrases:** "update Azure module", "upgrade azurerm provider", "run cdktf synth", "update main.ts imports"

## Installation

In Claude Code, run:

```
/install-plugin https://github.com/Vshwas/Pipeline
```
