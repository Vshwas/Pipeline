---
name: cdktf-azure-updater
description: This skill should be used when the user wants to "update a CDKTF Azure module", "upgrade azurerm provider", "run cdktf synth", "update terraform provider version", "fix CDKTF imports", "update main.ts for new azurerm version", "run npm install and cdktf synth for an Azure module", or needs to upgrade any Azure module in the dcd-iac-icloudaccelerator repo to a new azurerm provider version. Trigger whenever the user mentions updating, upgrading, or syncing any Azure CDKTF TypeScript module.
version: 1.0.0
---

# CDKTF Azure Module Updater

This skill automates the end-to-end workflow for updating an Azure CDKTF TypeScript module to a new `azurerm` provider version.

## When This Skill Applies

Use this skill when the user wants to:
- Update one or more Azure modules to a new azurerm provider version
- Run the full cdktf init → npm install → cdktf synth → terraform plan cycle
- Fix deprecated arguments or broken imports in `main.ts`
- Validate a module before committing updated `cdk.tf.json`

---

## Step-by-Step Workflow

Work through each step in order. Confirm success at each step before proceeding. If the user provides a module name or path, derive the full path; otherwise ask.

### 0. Identify the Target Module

- Ask: "Which module do you want to update?" if not already specified.
- Resolve the full path, e.g.:  
  `dcd-iac-icloudaccelerator/Azure/01_Azure_ResGrp`
- All steps below run inside this folder.

---

### 1. Update `cdktf.json`

Open `cdktf.json` in the module folder. Update the `terraformProviders` array to pin the new version:

```json
"terraformProviders": ["registry.terraform.io/hashicorp/azurerm@4.64.0"]
```

- Replace the old version (e.g. `azurerm@~>2.0.0` or `azurerm@4.32.0`) with the target version.
- Keep all other fields unchanged.
- Default target version: **4.64.0** unless the user specifies otherwise.

---

### 2. Install Node Dependencies

```bash
cd <module-folder>
npm install
```

Wait for completion. If errors appear, report them and stop.

---

### 3. Regenerate Provider Bindings

```bash
npm run get
```

This downloads the azurerm provider bindings into `.gen/providers/azurerm/`. Wait for completion.

---

### 4. Fix Imports in `main.ts`

Open `main.ts`. Update the provider/resource import lines:

**Old pattern (deprecated — CDKTF was deprecated Dec 10, 2025):**
```typescript
import { ResourceGroup, AzurermProvider } from "@cdktf/provider-azurerm";
// or
import { ResourceGroup } from "@cdktf/provider-azurerm/lib/resource-group";
```

**New pattern (use `.gen` folder):**
```typescript
import { ResourceGroup, AzurermProvider } from "./.gen/providers/azurerm";
```

Rules:
- The `cdktf` and `constructs` imports stay unchanged.
- Only the resource/provider imports move to `./.gen/providers/azurerm`.
- Check the actual `.gen/providers/azurerm/index.ts` to verify export names if needed.
- Fix any deprecated constructor arguments or removed resource blocks (read Terraform docs if unsure).

---

### 5. Comment Out Backend for Testing

In `main.ts`, comment out:
1. The `AzurermBackend` import (from the `cdktf` import line)
2. All `Backend_*` TerraformVariable declarations
3. The `new AzurermBackend(this, { ... })` block

**Example — before:**
```typescript
import { App, AzurermBackend, TerraformLocal, TerraformStack, TerraformVariable } from "cdktf";
```
**After:**
```typescript
import { App, /* AzurermBackend, */ TerraformLocal, TerraformStack, TerraformVariable } from "cdktf";
```

Comment out the entire `new AzurermBackend(this, { ... });` block with `/* ... */`.

Also comment out the four Backend TerraformVariable declarations (`Backend_Resource_Group_Name`, `Backend_Storage_Account_Name`, `Backend_Container_Name`, `Backend_Key`).

---

### 6. Run `cdktf synth`

```bash
cdktf synth
```

- On success: a `cdk.tf.json` is generated inside `cdktf.out/stacks/<stack-name>/`.
- On failure: read the error, fix `main.ts`, and re-run.
- Common errors: wrong import paths, missing variables, unsupported resource arguments.

---

### 7. Create `var.tfvars`

Read the variables in `cdk.tf.json` (under `"variable"` key). Create a `var.tfvars` file in the module root with **sample values** of the correct type.

**Example:**
```hcl
Resource_Group_Name        = "test-rg"
Resource_Group_Location    = "centralindia"
Environment                = "Development"
Project_Name               = "ICloudAccelerator"
Purpose                    = "Testing"
Subscription_Id            = "d9089190-b59b-4c09-8424-903d249b2f57"
Tenant_Id                  = "sample-tenant-id"
Client_Id                  = "sample-client-id"
Client_Secret              = "sample-client-secret"
```

Use these test defaults where applicable:
- Subscription: `d9089190-b59b-4c09-8424-903d249b2f57`
- Resource Group: `test-rg-dcddeployment`
- Storage Account: `stdcddeploy`
- Key Vault: `kvdcddeploy`
- Location: `centralindia`

---

### 8. Run `terraform init` and `terraform plan`

```bash
cd cdktf.out/stacks/<stack-name>
terraform init
terraform plan -var-file="<absolute-path-to-var.tfvars>"
```

- If `terraform plan` succeeds (even with a non-zero change count), the module is valid.
- If it fails, diagnose the error, fix `main.ts`, re-run `cdktf synth`, and retry plan.

---

### 9. Uncomment Backend

Go back to `main.ts` and uncomment everything you commented in Step 5:
- Restore `AzurermBackend` in the import line
- Uncomment all four `Backend_*` TerraformVariable declarations
- Uncomment the `new AzurermBackend(this, { ... });` block

---

### 10. Final `cdktf synth`

```bash
cd <module-folder>
cdktf synth
```

Verify the regenerated `cdk.tf.json`:
- `provider.azurerm.version` matches the target (e.g. `4.64.0`)
- Backend config is present
- No `&&& ` or `??? ` placeholder strings remain in any variable values or descriptions

Report success to the user with a summary of what changed.

---

## Handling Special Cases

### Optional Variables
Before finishing, check the [Terraform azurerm docs](https://registry.terraform.io/providers/hashicorp/azurerm/4.64.0/docs) for the resource being managed. Add any commonly-used optional variables that were missing (e.g., `tags`, `sku`, `kind`). Read `references/optional-vars.md` for guidance.

### Dropdown / Enum Variables
If `main.ts` had variables with dropdown enum values (e.g., SKU tiers, replication types), match the new variable names to the old UI-visible labels. Do not rename or reorder enum values without noting the change.

### `&&&` or `???` Markers
These are cross-module references. Log them as unresolved and report to the user — do not guess values.

### Missing `main.ts`
If the module has no `main.ts`, refer to the `cdk.tf.json` in the Azure DevOps repo (`dcd-backend-deploy-icloudaccelerator`) to reconstruct it from scratch. Ask the user for access if needed.

---

## Success Checklist

Before marking the module done, confirm:
- [ ] `cdktf.json` has correct provider version
- [ ] `.gen/providers/azurerm/` exists and is populated
- [ ] `main.ts` imports use `./.gen/` paths
- [ ] `cdktf synth` passes with backend uncommented
- [ ] `cdk.tf.json` has correct provider version and backend config
- [ ] No `&&&` or `???` placeholders remain unaddressed
- [ ] Optional variables reviewed

---

## Reference Files

- `references/workflow.md` — Detailed notes on common errors and fixes per module type
