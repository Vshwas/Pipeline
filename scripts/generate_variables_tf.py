#!/usr/bin/env python3
"""Generate variables.tf from a CDKTF-produced cdk.tf.json file."""
import json
import sys

cdk_json_path = sys.argv[1] if len(sys.argv) > 1 else "cdktf.out/stacks/17_Azure_ACR/cdk.tf.json"

with open(cdk_json_path) as f:
    data = json.load(f)

variables = data.get("variable", {})
lines = []
for name, attrs in variables.items():
    lines.append(f'variable "{name}" {{')
    vtype = attrs.get("type", "string")
    lines.append(f"  type        = {vtype}")
    desc = attrs.get("description", "").replace('"', '\\"')
    if desc:
        lines.append(f'  description = "{desc}"')
    if "default" in attrs:
        default = attrs["default"]
        if isinstance(default, bool):
            lines.append(f'  default     = {"true" if default else "false"}')
        elif isinstance(default, str):
            lines.append(f'  default     = "{default}"')
        else:
            lines.append(f"  default     = {default}")
    lines.append("}")
    lines.append("")

output_path = "variables.tf"
with open(output_path, "w") as f:
    f.write("\n".join(lines))

print(f"Generated {output_path} with {len(variables)} variables.")
