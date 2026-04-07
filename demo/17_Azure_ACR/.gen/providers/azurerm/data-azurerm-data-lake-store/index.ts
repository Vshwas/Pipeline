// https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/data-sources/data_lake_store
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataAzurermDataLakeStoreConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/data-sources/data_lake_store#id DataAzurermDataLakeStore#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/data-sources/data_lake_store#name DataAzurermDataLakeStore#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/data-sources/data_lake_store#resource_group_name DataAzurermDataLakeStore#resource_group_name}
  */
  readonly resourceGroupName: string;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/data-sources/data_lake_store#timeouts DataAzurermDataLakeStore#timeouts}
  */
  readonly timeouts?: DataAzurermDataLakeStoreTimeouts;
}
export interface DataAzurermDataLakeStoreTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/data-sources/data_lake_store#read DataAzurermDataLakeStore#read}
  */
  readonly read?: string;
}

export function dataAzurermDataLakeStoreTimeoutsToTerraform(struct?: DataAzurermDataLakeStoreTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    read: cdktf.stringToTerraform(struct!.read),
  }
}


export function dataAzurermDataLakeStoreTimeoutsToHclTerraform(struct?: DataAzurermDataLakeStoreTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    read: {
      value: cdktf.stringToHclTerraform(struct!.read),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DataAzurermDataLakeStoreTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): DataAzurermDataLakeStoreTimeouts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._read !== undefined) {
      hasAnyValues = true;
      internalValueResult.read = this._read;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataAzurermDataLakeStoreTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._read = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._read = value.read;
    }
  }

  // read - computed: false, optional: true, required: false
  private _read?: string; 
  public get read() {
    return this.getStringAttribute('read');
  }
  public set read(value: string) {
    this._read = value;
  }
  public resetRead() {
    this._read = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get readInput() {
    return this._read;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/data-sources/data_lake_store azurerm_data_lake_store}
*/
export class DataAzurermDataLakeStore extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "azurerm_data_lake_store";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataAzurermDataLakeStore resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataAzurermDataLakeStore to import
  * @param importFromId The id of the existing DataAzurermDataLakeStore that should be imported. Refer to the {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/data-sources/data_lake_store#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataAzurermDataLakeStore to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "azurerm_data_lake_store", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/data-sources/data_lake_store azurerm_data_lake_store} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataAzurermDataLakeStoreConfig
  */
  public constructor(scope: Construct, id: string, config: DataAzurermDataLakeStoreConfig) {
    super(scope, id, {
      terraformResourceType: 'azurerm_data_lake_store',
      terraformGeneratorMetadata: {
        providerName: 'azurerm',
        providerVersion: '2.0.0',
        providerVersionConstraint: '~>2.0.0'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle,
      provisioners: config.provisioners,
      connection: config.connection,
      forEach: config.forEach
    });
    this._id = config.id;
    this._name = config.name;
    this._resourceGroupName = config.resourceGroupName;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // encryption_state - computed: true, optional: false, required: false
  public get encryptionState() {
    return this.getStringAttribute('encryption_state');
  }

  // encryption_type - computed: true, optional: false, required: false
  public get encryptionType() {
    return this.getStringAttribute('encryption_type');
  }

  // firewall_allow_azure_ips - computed: true, optional: false, required: false
  public get firewallAllowAzureIps() {
    return this.getStringAttribute('firewall_allow_azure_ips');
  }

  // firewall_state - computed: true, optional: false, required: false
  public get firewallState() {
    return this.getStringAttribute('firewall_state');
  }

  // id - computed: true, optional: true, required: false
  private _id?: string; 
  public get id() {
    return this.getStringAttribute('id');
  }
  public set id(value: string) {
    this._id = value;
  }
  public resetId() {
    this._id = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get idInput() {
    return this._id;
  }

  // location - computed: true, optional: false, required: false
  public get location() {
    return this.getStringAttribute('location');
  }

  // name - computed: false, optional: false, required: true
  private _name?: string; 
  public get name() {
    return this.getStringAttribute('name');
  }
  public set name(value: string) {
    this._name = value;
  }
  // Temporarily expose input value. Use with caution.
  public get nameInput() {
    return this._name;
  }

  // resource_group_name - computed: false, optional: false, required: true
  private _resourceGroupName?: string; 
  public get resourceGroupName() {
    return this.getStringAttribute('resource_group_name');
  }
  public set resourceGroupName(value: string) {
    this._resourceGroupName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get resourceGroupNameInput() {
    return this._resourceGroupName;
  }

  // tags - computed: true, optional: false, required: false
  private _tags = new cdktf.StringMap(this, "tags");
  public get tags() {
    return this._tags;
  }

  // tier - computed: true, optional: false, required: false
  public get tier() {
    return this.getStringAttribute('tier');
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new DataAzurermDataLakeStoreTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: DataAzurermDataLakeStoreTimeouts) {
    this._timeouts.internalValue = value;
  }
  public resetTimeouts() {
    this._timeouts.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutsInput() {
    return this._timeouts.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      resource_group_name: cdktf.stringToTerraform(this._resourceGroupName),
      timeouts: dataAzurermDataLakeStoreTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      resource_group_name: {
        value: cdktf.stringToHclTerraform(this._resourceGroupName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      timeouts: {
        value: dataAzurermDataLakeStoreTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "DataAzurermDataLakeStoreTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
