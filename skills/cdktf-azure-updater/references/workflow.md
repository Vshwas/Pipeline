# CDKTF Azure Updater — Common Errors & Module Notes

## Common `cdktf synth` Errors

### `Cannot find module './.gen/providers/azurerm'`
- `npm run get` was not run, or failed silently.
- Fix: Delete `node_modules` and `.gen`, then re-run `npm install` and `npm run get`.

### `Property 'X' does not exist on type 'AzurermProviderConfig'`
- The argument was removed or renamed in the new provider version.
- Fix: Check the azurerm changelog or Terraform docs for the resource. Remove or rename the argument in `main.ts`.

### `Type 'string' is not assignable to type 'number'`
- A variable type was changed (e.g., `location_number` changed from `string` to `number`).
- Fix: Update the variable `type` field and `description` in `main.ts` to match.

### `AzurermBackend is not exported from 'cdktf'`
- Old cdktf version. Ensure `package.json` uses cdktf `>=0.20`.
- Fix: Run `npm install cdktf@latest`.

---

## Common `terraform plan` Errors

### `Error: Invalid provider configuration`
- Backend variables are still commented out but the backend block is not — or vice versa.
- Fix: Ensure backend is fully commented or fully uncommented.

### `Error: Unsupported argument`
- A resource argument no longer exists in azurerm 4.x.
- Fix: Remove or replace it. Check the resource docs at:  
  `https://registry.terraform.io/providers/hashicorp/azurerm/4.64.0/docs/resources/<resource>`

### `Error: Missing required argument`
- A newly required argument was added in 4.x.
- Fix: Add the argument with a `TerraformVariable` or hardcoded value.

---

## Module-Specific Notes

### Storage Account (`02_Azure_Storage`)
- `account_replication_type` and `account_tier` are required.
- `enable_https_traffic_only` was removed in azurerm 4.x — delete it.
- Optional: `min_tls_version`, `allow_nested_items_to_be_public`.

### AKS (`12_Azure_AKS`)
- `addon_profile` block was restructured in azurerm 3.x+.
- Use individual blocks: `oms_agent {}`, `ingress_application_gateway {}` etc.
- `default_node_pool.vm_size` is required.

### App Gateway (`08_Azure_AppGW`)
- Many nested blocks changed. Cross-reference with the Terraform docs carefully.
- `ssl_policy` block is optional but recommended.

### Key Vault (`24_Azure_KeyVault`)
- `purge_protection_enabled` and `soft_delete_retention_days` are now required in most configs.

### MySQL (`07_Azure_MySQLDB`)
- `azurerm_mysql_server` was replaced by `azurerm_mysql_flexible_server` in azurerm 3.x.
- Recreate the resource block using the flexible server schema.

### Container Registry (`17_Azure_ACR`)
- `georeplication_locations` replaced by a `georeplications` block.

---

## Import Path Quick Reference

| Old (deprecated) | New (.gen) |
|---|---|
| `@cdktf/provider-azurerm` | `./.gen/providers/azurerm` |
| `@cdktf/provider-azurerm/lib/resource-group` | `./.gen/providers/azurerm` |
| `@cdktf/provider-azurerm/lib/virtual-network` | `./.gen/providers/azurerm` |

All resource and provider classes are re-exported from `./.gen/providers/azurerm/index.ts`.

---

## Testing Resource Defaults

| Field | Value |
|---|---|
| Subscription ID | `d9089190-b59b` |
| Resource Group | `test-rg-dcddeployment` |
| Storage Account | `stdcddeploy` |
| Key Vault | `kvdcddeploy` |
| Location | `centralindia` |
