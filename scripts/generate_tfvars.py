#!/usr/bin/env python3
"""Generate var.tfvars with sample values from a CDKTF-produced cdk.tf.json file."""
import json
import sys

cdk_json_path = sys.argv[1] if len(sys.argv) > 1 else "cdktf.out/stacks/17_Azure_ACR/cdk.tf.json"

SAMPLE_VALUES = {
    "string": "sample-value",
    "number": "1",
    "bool": "false",
}

with open(cdk_json_path) as f:
    data = json.load(f)

variables = data.get("variable", {})
lines = []
for name, attrs in variables.items():
    vtype = attrs.get("type", "string")
    default = attrs.get("default")

    if default is not None:
        if isinstance(default, bool):
            value = "true" if default else "false"
        elif isinstance(default, str):
            value = f'"{default}"'
        else:
            value = str(default)
    elif vtype == "bool":
        value = "false"
    elif vtype == "number":
        value = "1"
    else:
        value = f'"{name}-sample"'

    lines.append(f'{name} = {value}')

with open("var.tfvars", "w") as f:
    f.write("\n".join(lines) + "\n")

print(f"Generated var.tfvars with {len(variables)} variables.")
