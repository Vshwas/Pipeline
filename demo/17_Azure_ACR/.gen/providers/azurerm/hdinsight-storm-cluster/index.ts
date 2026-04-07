// https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface HdinsightStormClusterConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#cluster_version HdinsightStormCluster#cluster_version}
  */
  readonly clusterVersion: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#id HdinsightStormCluster#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#location HdinsightStormCluster#location}
  */
  readonly location: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#name HdinsightStormCluster#name}
  */
  readonly name: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#resource_group_name HdinsightStormCluster#resource_group_name}
  */
  readonly resourceGroupName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#tags HdinsightStormCluster#tags}
  */
  readonly tags?: { [key: string]: string };
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#tier HdinsightStormCluster#tier}
  */
  readonly tier: string;
  /**
  * component_version block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#component_version HdinsightStormCluster#component_version}
  */
  readonly componentVersion: HdinsightStormClusterComponentVersion;
  /**
  * gateway block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#gateway HdinsightStormCluster#gateway}
  */
  readonly gateway: HdinsightStormClusterGateway;
  /**
  * roles block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#roles HdinsightStormCluster#roles}
  */
  readonly roles: HdinsightStormClusterRoles;
  /**
  * storage_account block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#storage_account HdinsightStormCluster#storage_account}
  */
  readonly storageAccount?: HdinsightStormClusterStorageAccount[] | cdktf.IResolvable;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#timeouts HdinsightStormCluster#timeouts}
  */
  readonly timeouts?: HdinsightStormClusterTimeouts;
}
export interface HdinsightStormClusterComponentVersion {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#storm HdinsightStormCluster#storm}
  */
  readonly storm: string;
}

export function hdinsightStormClusterComponentVersionToTerraform(struct?: HdinsightStormClusterComponentVersionOutputReference | HdinsightStormClusterComponentVersion): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    storm: cdktf.stringToTerraform(struct!.storm),
  }
}


export function hdinsightStormClusterComponentVersionToHclTerraform(struct?: HdinsightStormClusterComponentVersionOutputReference | HdinsightStormClusterComponentVersion): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    storm: {
      value: cdktf.stringToHclTerraform(struct!.storm),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class HdinsightStormClusterComponentVersionOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): HdinsightStormClusterComponentVersion | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._storm !== undefined) {
      hasAnyValues = true;
      internalValueResult.storm = this._storm;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: HdinsightStormClusterComponentVersion | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._storm = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._storm = value.storm;
    }
  }

  // storm - computed: false, optional: false, required: true
  private _storm?: string; 
  public get storm() {
    return this.getStringAttribute('storm');
  }
  public set storm(value: string) {
    this._storm = value;
  }
  // Temporarily expose input value. Use with caution.
  public get stormInput() {
    return this._storm;
  }
}
export interface HdinsightStormClusterGateway {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#enabled HdinsightStormCluster#enabled}
  */
  readonly enabled: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#password HdinsightStormCluster#password}
  */
  readonly password: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#username HdinsightStormCluster#username}
  */
  readonly username: string;
}

export function hdinsightStormClusterGatewayToTerraform(struct?: HdinsightStormClusterGatewayOutputReference | HdinsightStormClusterGateway): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    enabled: cdktf.booleanToTerraform(struct!.enabled),
    password: cdktf.stringToTerraform(struct!.password),
    username: cdktf.stringToTerraform(struct!.username),
  }
}


export function hdinsightStormClusterGatewayToHclTerraform(struct?: HdinsightStormClusterGatewayOutputReference | HdinsightStormClusterGateway): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    enabled: {
      value: cdktf.booleanToHclTerraform(struct!.enabled),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    password: {
      value: cdktf.stringToHclTerraform(struct!.password),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    username: {
      value: cdktf.stringToHclTerraform(struct!.username),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class HdinsightStormClusterGatewayOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): HdinsightStormClusterGateway | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._enabled !== undefined) {
      hasAnyValues = true;
      internalValueResult.enabled = this._enabled;
    }
    if (this._password !== undefined) {
      hasAnyValues = true;
      internalValueResult.password = this._password;
    }
    if (this._username !== undefined) {
      hasAnyValues = true;
      internalValueResult.username = this._username;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: HdinsightStormClusterGateway | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._enabled = undefined;
      this._password = undefined;
      this._username = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._enabled = value.enabled;
      this._password = value.password;
      this._username = value.username;
    }
  }

  // enabled - computed: false, optional: false, required: true
  private _enabled?: boolean | cdktf.IResolvable; 
  public get enabled() {
    return this.getBooleanAttribute('enabled');
  }
  public set enabled(value: boolean | cdktf.IResolvable) {
    this._enabled = value;
  }
  // Temporarily expose input value. Use with caution.
  public get enabledInput() {
    return this._enabled;
  }

  // password - computed: false, optional: false, required: true
  private _password?: string; 
  public get password() {
    return this.getStringAttribute('password');
  }
  public set password(value: string) {
    this._password = value;
  }
  // Temporarily expose input value. Use with caution.
  public get passwordInput() {
    return this._password;
  }

  // username - computed: false, optional: false, required: true
  private _username?: string; 
  public get username() {
    return this.getStringAttribute('username');
  }
  public set username(value: string) {
    this._username = value;
  }
  // Temporarily expose input value. Use with caution.
  public get usernameInput() {
    return this._username;
  }
}
export interface HdinsightStormClusterRolesHeadNode {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#password HdinsightStormCluster#password}
  */
  readonly password?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#ssh_keys HdinsightStormCluster#ssh_keys}
  */
  readonly sshKeys?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#subnet_id HdinsightStormCluster#subnet_id}
  */
  readonly subnetId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#username HdinsightStormCluster#username}
  */
  readonly username: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#virtual_network_id HdinsightStormCluster#virtual_network_id}
  */
  readonly virtualNetworkId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#vm_size HdinsightStormCluster#vm_size}
  */
  readonly vmSize: string;
}

export function hdinsightStormClusterRolesHeadNodeToTerraform(struct?: HdinsightStormClusterRolesHeadNodeOutputReference | HdinsightStormClusterRolesHeadNode): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    password: cdktf.stringToTerraform(struct!.password),
    ssh_keys: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.sshKeys),
    subnet_id: cdktf.stringToTerraform(struct!.subnetId),
    username: cdktf.stringToTerraform(struct!.username),
    virtual_network_id: cdktf.stringToTerraform(struct!.virtualNetworkId),
    vm_size: cdktf.stringToTerraform(struct!.vmSize),
  }
}


export function hdinsightStormClusterRolesHeadNodeToHclTerraform(struct?: HdinsightStormClusterRolesHeadNodeOutputReference | HdinsightStormClusterRolesHeadNode): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    password: {
      value: cdktf.stringToHclTerraform(struct!.password),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    ssh_keys: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.sshKeys),
      isBlock: false,
      type: "set",
      storageClassType: "stringList",
    },
    subnet_id: {
      value: cdktf.stringToHclTerraform(struct!.subnetId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    username: {
      value: cdktf.stringToHclTerraform(struct!.username),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    virtual_network_id: {
      value: cdktf.stringToHclTerraform(struct!.virtualNetworkId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    vm_size: {
      value: cdktf.stringToHclTerraform(struct!.vmSize),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class HdinsightStormClusterRolesHeadNodeOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): HdinsightStormClusterRolesHeadNode | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._password !== undefined) {
      hasAnyValues = true;
      internalValueResult.password = this._password;
    }
    if (this._sshKeys !== undefined) {
      hasAnyValues = true;
      internalValueResult.sshKeys = this._sshKeys;
    }
    if (this._subnetId !== undefined) {
      hasAnyValues = true;
      internalValueResult.subnetId = this._subnetId;
    }
    if (this._username !== undefined) {
      hasAnyValues = true;
      internalValueResult.username = this._username;
    }
    if (this._virtualNetworkId !== undefined) {
      hasAnyValues = true;
      internalValueResult.virtualNetworkId = this._virtualNetworkId;
    }
    if (this._vmSize !== undefined) {
      hasAnyValues = true;
      internalValueResult.vmSize = this._vmSize;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: HdinsightStormClusterRolesHeadNode | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._password = undefined;
      this._sshKeys = undefined;
      this._subnetId = undefined;
      this._username = undefined;
      this._virtualNetworkId = undefined;
      this._vmSize = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._password = value.password;
      this._sshKeys = value.sshKeys;
      this._subnetId = value.subnetId;
      this._username = value.username;
      this._virtualNetworkId = value.virtualNetworkId;
      this._vmSize = value.vmSize;
    }
  }

  // password - computed: false, optional: true, required: false
  private _password?: string; 
  public get password() {
    return this.getStringAttribute('password');
  }
  public set password(value: string) {
    this._password = value;
  }
  public resetPassword() {
    this._password = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get passwordInput() {
    return this._password;
  }

  // ssh_keys - computed: false, optional: true, required: false
  private _sshKeys?: string[]; 
  public get sshKeys() {
    return cdktf.Fn.tolist(this.getListAttribute('ssh_keys'));
  }
  public set sshKeys(value: string[]) {
    this._sshKeys = value;
  }
  public resetSshKeys() {
    this._sshKeys = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sshKeysInput() {
    return this._sshKeys;
  }

  // subnet_id - computed: false, optional: true, required: false
  private _subnetId?: string; 
  public get subnetId() {
    return this.getStringAttribute('subnet_id');
  }
  public set subnetId(value: string) {
    this._subnetId = value;
  }
  public resetSubnetId() {
    this._subnetId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get subnetIdInput() {
    return this._subnetId;
  }

  // username - computed: false, optional: false, required: true
  private _username?: string; 
  public get username() {
    return this.getStringAttribute('username');
  }
  public set username(value: string) {
    this._username = value;
  }
  // Temporarily expose input value. Use with caution.
  public get usernameInput() {
    return this._username;
  }

  // virtual_network_id - computed: false, optional: true, required: false
  private _virtualNetworkId?: string; 
  public get virtualNetworkId() {
    return this.getStringAttribute('virtual_network_id');
  }
  public set virtualNetworkId(value: string) {
    this._virtualNetworkId = value;
  }
  public resetVirtualNetworkId() {
    this._virtualNetworkId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get virtualNetworkIdInput() {
    return this._virtualNetworkId;
  }

  // vm_size - computed: false, optional: false, required: true
  private _vmSize?: string; 
  public get vmSize() {
    return this.getStringAttribute('vm_size');
  }
  public set vmSize(value: string) {
    this._vmSize = value;
  }
  // Temporarily expose input value. Use with caution.
  public get vmSizeInput() {
    return this._vmSize;
  }
}
export interface HdinsightStormClusterRolesWorkerNode {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#min_instance_count HdinsightStormCluster#min_instance_count}
  */
  readonly minInstanceCount?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#password HdinsightStormCluster#password}
  */
  readonly password?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#ssh_keys HdinsightStormCluster#ssh_keys}
  */
  readonly sshKeys?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#subnet_id HdinsightStormCluster#subnet_id}
  */
  readonly subnetId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#target_instance_count HdinsightStormCluster#target_instance_count}
  */
  readonly targetInstanceCount: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#username HdinsightStormCluster#username}
  */
  readonly username: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#virtual_network_id HdinsightStormCluster#virtual_network_id}
  */
  readonly virtualNetworkId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#vm_size HdinsightStormCluster#vm_size}
  */
  readonly vmSize: string;
}

export function hdinsightStormClusterRolesWorkerNodeToTerraform(struct?: HdinsightStormClusterRolesWorkerNodeOutputReference | HdinsightStormClusterRolesWorkerNode): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    min_instance_count: cdktf.numberToTerraform(struct!.minInstanceCount),
    password: cdktf.stringToTerraform(struct!.password),
    ssh_keys: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.sshKeys),
    subnet_id: cdktf.stringToTerraform(struct!.subnetId),
    target_instance_count: cdktf.numberToTerraform(struct!.targetInstanceCount),
    username: cdktf.stringToTerraform(struct!.username),
    virtual_network_id: cdktf.stringToTerraform(struct!.virtualNetworkId),
    vm_size: cdktf.stringToTerraform(struct!.vmSize),
  }
}


export function hdinsightStormClusterRolesWorkerNodeToHclTerraform(struct?: HdinsightStormClusterRolesWorkerNodeOutputReference | HdinsightStormClusterRolesWorkerNode): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    min_instance_count: {
      value: cdktf.numberToHclTerraform(struct!.minInstanceCount),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    password: {
      value: cdktf.stringToHclTerraform(struct!.password),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    ssh_keys: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.sshKeys),
      isBlock: false,
      type: "set",
      storageClassType: "stringList",
    },
    subnet_id: {
      value: cdktf.stringToHclTerraform(struct!.subnetId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    target_instance_count: {
      value: cdktf.numberToHclTerraform(struct!.targetInstanceCount),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    username: {
      value: cdktf.stringToHclTerraform(struct!.username),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    virtual_network_id: {
      value: cdktf.stringToHclTerraform(struct!.virtualNetworkId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    vm_size: {
      value: cdktf.stringToHclTerraform(struct!.vmSize),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class HdinsightStormClusterRolesWorkerNodeOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): HdinsightStormClusterRolesWorkerNode | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._minInstanceCount !== undefined) {
      hasAnyValues = true;
      internalValueResult.minInstanceCount = this._minInstanceCount;
    }
    if (this._password !== undefined) {
      hasAnyValues = true;
      internalValueResult.password = this._password;
    }
    if (this._sshKeys !== undefined) {
      hasAnyValues = true;
      internalValueResult.sshKeys = this._sshKeys;
    }
    if (this._subnetId !== undefined) {
      hasAnyValues = true;
      internalValueResult.subnetId = this._subnetId;
    }
    if (this._targetInstanceCount !== undefined) {
      hasAnyValues = true;
      internalValueResult.targetInstanceCount = this._targetInstanceCount;
    }
    if (this._username !== undefined) {
      hasAnyValues = true;
      internalValueResult.username = this._username;
    }
    if (this._virtualNetworkId !== undefined) {
      hasAnyValues = true;
      internalValueResult.virtualNetworkId = this._virtualNetworkId;
    }
    if (this._vmSize !== undefined) {
      hasAnyValues = true;
      internalValueResult.vmSize = this._vmSize;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: HdinsightStormClusterRolesWorkerNode | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._minInstanceCount = undefined;
      this._password = undefined;
      this._sshKeys = undefined;
      this._subnetId = undefined;
      this._targetInstanceCount = undefined;
      this._username = undefined;
      this._virtualNetworkId = undefined;
      this._vmSize = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._minInstanceCount = value.minInstanceCount;
      this._password = value.password;
      this._sshKeys = value.sshKeys;
      this._subnetId = value.subnetId;
      this._targetInstanceCount = value.targetInstanceCount;
      this._username = value.username;
      this._virtualNetworkId = value.virtualNetworkId;
      this._vmSize = value.vmSize;
    }
  }

  // min_instance_count - computed: false, optional: true, required: false
  private _minInstanceCount?: number; 
  public get minInstanceCount() {
    return this.getNumberAttribute('min_instance_count');
  }
  public set minInstanceCount(value: number) {
    this._minInstanceCount = value;
  }
  public resetMinInstanceCount() {
    this._minInstanceCount = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get minInstanceCountInput() {
    return this._minInstanceCount;
  }

  // password - computed: false, optional: true, required: false
  private _password?: string; 
  public get password() {
    return this.getStringAttribute('password');
  }
  public set password(value: string) {
    this._password = value;
  }
  public resetPassword() {
    this._password = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get passwordInput() {
    return this._password;
  }

  // ssh_keys - computed: false, optional: true, required: false
  private _sshKeys?: string[]; 
  public get sshKeys() {
    return cdktf.Fn.tolist(this.getListAttribute('ssh_keys'));
  }
  public set sshKeys(value: string[]) {
    this._sshKeys = value;
  }
  public resetSshKeys() {
    this._sshKeys = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sshKeysInput() {
    return this._sshKeys;
  }

  // subnet_id - computed: false, optional: true, required: false
  private _subnetId?: string; 
  public get subnetId() {
    return this.getStringAttribute('subnet_id');
  }
  public set subnetId(value: string) {
    this._subnetId = value;
  }
  public resetSubnetId() {
    this._subnetId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get subnetIdInput() {
    return this._subnetId;
  }

  // target_instance_count - computed: false, optional: false, required: true
  private _targetInstanceCount?: number; 
  public get targetInstanceCount() {
    return this.getNumberAttribute('target_instance_count');
  }
  public set targetInstanceCount(value: number) {
    this._targetInstanceCount = value;
  }
  // Temporarily expose input value. Use with caution.
  public get targetInstanceCountInput() {
    return this._targetInstanceCount;
  }

  // username - computed: false, optional: false, required: true
  private _username?: string; 
  public get username() {
    return this.getStringAttribute('username');
  }
  public set username(value: string) {
    this._username = value;
  }
  // Temporarily expose input value. Use with caution.
  public get usernameInput() {
    return this._username;
  }

  // virtual_network_id - computed: false, optional: true, required: false
  private _virtualNetworkId?: string; 
  public get virtualNetworkId() {
    return this.getStringAttribute('virtual_network_id');
  }
  public set virtualNetworkId(value: string) {
    this._virtualNetworkId = value;
  }
  public resetVirtualNetworkId() {
    this._virtualNetworkId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get virtualNetworkIdInput() {
    return this._virtualNetworkId;
  }

  // vm_size - computed: false, optional: false, required: true
  private _vmSize?: string; 
  public get vmSize() {
    return this.getStringAttribute('vm_size');
  }
  public set vmSize(value: string) {
    this._vmSize = value;
  }
  // Temporarily expose input value. Use with caution.
  public get vmSizeInput() {
    return this._vmSize;
  }
}
export interface HdinsightStormClusterRolesZookeeperNode {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#password HdinsightStormCluster#password}
  */
  readonly password?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#ssh_keys HdinsightStormCluster#ssh_keys}
  */
  readonly sshKeys?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#subnet_id HdinsightStormCluster#subnet_id}
  */
  readonly subnetId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#username HdinsightStormCluster#username}
  */
  readonly username: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#virtual_network_id HdinsightStormCluster#virtual_network_id}
  */
  readonly virtualNetworkId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#vm_size HdinsightStormCluster#vm_size}
  */
  readonly vmSize: string;
}

export function hdinsightStormClusterRolesZookeeperNodeToTerraform(struct?: HdinsightStormClusterRolesZookeeperNodeOutputReference | HdinsightStormClusterRolesZookeeperNode): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    password: cdktf.stringToTerraform(struct!.password),
    ssh_keys: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.sshKeys),
    subnet_id: cdktf.stringToTerraform(struct!.subnetId),
    username: cdktf.stringToTerraform(struct!.username),
    virtual_network_id: cdktf.stringToTerraform(struct!.virtualNetworkId),
    vm_size: cdktf.stringToTerraform(struct!.vmSize),
  }
}


export function hdinsightStormClusterRolesZookeeperNodeToHclTerraform(struct?: HdinsightStormClusterRolesZookeeperNodeOutputReference | HdinsightStormClusterRolesZookeeperNode): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    password: {
      value: cdktf.stringToHclTerraform(struct!.password),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    ssh_keys: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.sshKeys),
      isBlock: false,
      type: "set",
      storageClassType: "stringList",
    },
    subnet_id: {
      value: cdktf.stringToHclTerraform(struct!.subnetId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    username: {
      value: cdktf.stringToHclTerraform(struct!.username),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    virtual_network_id: {
      value: cdktf.stringToHclTerraform(struct!.virtualNetworkId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    vm_size: {
      value: cdktf.stringToHclTerraform(struct!.vmSize),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class HdinsightStormClusterRolesZookeeperNodeOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): HdinsightStormClusterRolesZookeeperNode | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._password !== undefined) {
      hasAnyValues = true;
      internalValueResult.password = this._password;
    }
    if (this._sshKeys !== undefined) {
      hasAnyValues = true;
      internalValueResult.sshKeys = this._sshKeys;
    }
    if (this._subnetId !== undefined) {
      hasAnyValues = true;
      internalValueResult.subnetId = this._subnetId;
    }
    if (this._username !== undefined) {
      hasAnyValues = true;
      internalValueResult.username = this._username;
    }
    if (this._virtualNetworkId !== undefined) {
      hasAnyValues = true;
      internalValueResult.virtualNetworkId = this._virtualNetworkId;
    }
    if (this._vmSize !== undefined) {
      hasAnyValues = true;
      internalValueResult.vmSize = this._vmSize;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: HdinsightStormClusterRolesZookeeperNode | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._password = undefined;
      this._sshKeys = undefined;
      this._subnetId = undefined;
      this._username = undefined;
      this._virtualNetworkId = undefined;
      this._vmSize = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._password = value.password;
      this._sshKeys = value.sshKeys;
      this._subnetId = value.subnetId;
      this._username = value.username;
      this._virtualNetworkId = value.virtualNetworkId;
      this._vmSize = value.vmSize;
    }
  }

  // password - computed: false, optional: true, required: false
  private _password?: string; 
  public get password() {
    return this.getStringAttribute('password');
  }
  public set password(value: string) {
    this._password = value;
  }
  public resetPassword() {
    this._password = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get passwordInput() {
    return this._password;
  }

  // ssh_keys - computed: false, optional: true, required: false
  private _sshKeys?: string[]; 
  public get sshKeys() {
    return cdktf.Fn.tolist(this.getListAttribute('ssh_keys'));
  }
  public set sshKeys(value: string[]) {
    this._sshKeys = value;
  }
  public resetSshKeys() {
    this._sshKeys = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sshKeysInput() {
    return this._sshKeys;
  }

  // subnet_id - computed: false, optional: true, required: false
  private _subnetId?: string; 
  public get subnetId() {
    return this.getStringAttribute('subnet_id');
  }
  public set subnetId(value: string) {
    this._subnetId = value;
  }
  public resetSubnetId() {
    this._subnetId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get subnetIdInput() {
    return this._subnetId;
  }

  // username - computed: false, optional: false, required: true
  private _username?: string; 
  public get username() {
    return this.getStringAttribute('username');
  }
  public set username(value: string) {
    this._username = value;
  }
  // Temporarily expose input value. Use with caution.
  public get usernameInput() {
    return this._username;
  }

  // virtual_network_id - computed: false, optional: true, required: false
  private _virtualNetworkId?: string; 
  public get virtualNetworkId() {
    return this.getStringAttribute('virtual_network_id');
  }
  public set virtualNetworkId(value: string) {
    this._virtualNetworkId = value;
  }
  public resetVirtualNetworkId() {
    this._virtualNetworkId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get virtualNetworkIdInput() {
    return this._virtualNetworkId;
  }

  // vm_size - computed: false, optional: false, required: true
  private _vmSize?: string; 
  public get vmSize() {
    return this.getStringAttribute('vm_size');
  }
  public set vmSize(value: string) {
    this._vmSize = value;
  }
  // Temporarily expose input value. Use with caution.
  public get vmSizeInput() {
    return this._vmSize;
  }
}
export interface HdinsightStormClusterRoles {
  /**
  * head_node block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#head_node HdinsightStormCluster#head_node}
  */
  readonly headNode: HdinsightStormClusterRolesHeadNode;
  /**
  * worker_node block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#worker_node HdinsightStormCluster#worker_node}
  */
  readonly workerNode: HdinsightStormClusterRolesWorkerNode;
  /**
  * zookeeper_node block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#zookeeper_node HdinsightStormCluster#zookeeper_node}
  */
  readonly zookeeperNode: HdinsightStormClusterRolesZookeeperNode;
}

export function hdinsightStormClusterRolesToTerraform(struct?: HdinsightStormClusterRolesOutputReference | HdinsightStormClusterRoles): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    head_node: hdinsightStormClusterRolesHeadNodeToTerraform(struct!.headNode),
    worker_node: hdinsightStormClusterRolesWorkerNodeToTerraform(struct!.workerNode),
    zookeeper_node: hdinsightStormClusterRolesZookeeperNodeToTerraform(struct!.zookeeperNode),
  }
}


export function hdinsightStormClusterRolesToHclTerraform(struct?: HdinsightStormClusterRolesOutputReference | HdinsightStormClusterRoles): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    head_node: {
      value: hdinsightStormClusterRolesHeadNodeToHclTerraform(struct!.headNode),
      isBlock: true,
      type: "list",
      storageClassType: "HdinsightStormClusterRolesHeadNodeList",
    },
    worker_node: {
      value: hdinsightStormClusterRolesWorkerNodeToHclTerraform(struct!.workerNode),
      isBlock: true,
      type: "list",
      storageClassType: "HdinsightStormClusterRolesWorkerNodeList",
    },
    zookeeper_node: {
      value: hdinsightStormClusterRolesZookeeperNodeToHclTerraform(struct!.zookeeperNode),
      isBlock: true,
      type: "list",
      storageClassType: "HdinsightStormClusterRolesZookeeperNodeList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class HdinsightStormClusterRolesOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): HdinsightStormClusterRoles | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._headNode?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.headNode = this._headNode?.internalValue;
    }
    if (this._workerNode?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.workerNode = this._workerNode?.internalValue;
    }
    if (this._zookeeperNode?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.zookeeperNode = this._zookeeperNode?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: HdinsightStormClusterRoles | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._headNode.internalValue = undefined;
      this._workerNode.internalValue = undefined;
      this._zookeeperNode.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._headNode.internalValue = value.headNode;
      this._workerNode.internalValue = value.workerNode;
      this._zookeeperNode.internalValue = value.zookeeperNode;
    }
  }

  // head_node - computed: false, optional: false, required: true
  private _headNode = new HdinsightStormClusterRolesHeadNodeOutputReference(this, "head_node");
  public get headNode() {
    return this._headNode;
  }
  public putHeadNode(value: HdinsightStormClusterRolesHeadNode) {
    this._headNode.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get headNodeInput() {
    return this._headNode.internalValue;
  }

  // worker_node - computed: false, optional: false, required: true
  private _workerNode = new HdinsightStormClusterRolesWorkerNodeOutputReference(this, "worker_node");
  public get workerNode() {
    return this._workerNode;
  }
  public putWorkerNode(value: HdinsightStormClusterRolesWorkerNode) {
    this._workerNode.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get workerNodeInput() {
    return this._workerNode.internalValue;
  }

  // zookeeper_node - computed: false, optional: false, required: true
  private _zookeeperNode = new HdinsightStormClusterRolesZookeeperNodeOutputReference(this, "zookeeper_node");
  public get zookeeperNode() {
    return this._zookeeperNode;
  }
  public putZookeeperNode(value: HdinsightStormClusterRolesZookeeperNode) {
    this._zookeeperNode.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get zookeeperNodeInput() {
    return this._zookeeperNode.internalValue;
  }
}
export interface HdinsightStormClusterStorageAccount {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#is_default HdinsightStormCluster#is_default}
  */
  readonly isDefault: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#storage_account_key HdinsightStormCluster#storage_account_key}
  */
  readonly storageAccountKey: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#storage_container_id HdinsightStormCluster#storage_container_id}
  */
  readonly storageContainerId: string;
}

export function hdinsightStormClusterStorageAccountToTerraform(struct?: HdinsightStormClusterStorageAccount | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    is_default: cdktf.booleanToTerraform(struct!.isDefault),
    storage_account_key: cdktf.stringToTerraform(struct!.storageAccountKey),
    storage_container_id: cdktf.stringToTerraform(struct!.storageContainerId),
  }
}


export function hdinsightStormClusterStorageAccountToHclTerraform(struct?: HdinsightStormClusterStorageAccount | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    is_default: {
      value: cdktf.booleanToHclTerraform(struct!.isDefault),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    storage_account_key: {
      value: cdktf.stringToHclTerraform(struct!.storageAccountKey),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    storage_container_id: {
      value: cdktf.stringToHclTerraform(struct!.storageContainerId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class HdinsightStormClusterStorageAccountOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): HdinsightStormClusterStorageAccount | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._isDefault !== undefined) {
      hasAnyValues = true;
      internalValueResult.isDefault = this._isDefault;
    }
    if (this._storageAccountKey !== undefined) {
      hasAnyValues = true;
      internalValueResult.storageAccountKey = this._storageAccountKey;
    }
    if (this._storageContainerId !== undefined) {
      hasAnyValues = true;
      internalValueResult.storageContainerId = this._storageContainerId;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: HdinsightStormClusterStorageAccount | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._isDefault = undefined;
      this._storageAccountKey = undefined;
      this._storageContainerId = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._isDefault = value.isDefault;
      this._storageAccountKey = value.storageAccountKey;
      this._storageContainerId = value.storageContainerId;
    }
  }

  // is_default - computed: false, optional: false, required: true
  private _isDefault?: boolean | cdktf.IResolvable; 
  public get isDefault() {
    return this.getBooleanAttribute('is_default');
  }
  public set isDefault(value: boolean | cdktf.IResolvable) {
    this._isDefault = value;
  }
  // Temporarily expose input value. Use with caution.
  public get isDefaultInput() {
    return this._isDefault;
  }

  // storage_account_key - computed: false, optional: false, required: true
  private _storageAccountKey?: string; 
  public get storageAccountKey() {
    return this.getStringAttribute('storage_account_key');
  }
  public set storageAccountKey(value: string) {
    this._storageAccountKey = value;
  }
  // Temporarily expose input value. Use with caution.
  public get storageAccountKeyInput() {
    return this._storageAccountKey;
  }

  // storage_container_id - computed: false, optional: false, required: true
  private _storageContainerId?: string; 
  public get storageContainerId() {
    return this.getStringAttribute('storage_container_id');
  }
  public set storageContainerId(value: string) {
    this._storageContainerId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get storageContainerIdInput() {
    return this._storageContainerId;
  }
}

export class HdinsightStormClusterStorageAccountList extends cdktf.ComplexList {
  public internalValue? : HdinsightStormClusterStorageAccount[] | cdktf.IResolvable

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param wrapsSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  constructor(protected terraformResource: cdktf.IInterpolatingParent, protected terraformAttribute: string, protected wrapsSet: boolean) {
    super(terraformResource, terraformAttribute, wrapsSet)
  }

  /**
  * @param index the index of the item to return
  */
  public get(index: number): HdinsightStormClusterStorageAccountOutputReference {
    return new HdinsightStormClusterStorageAccountOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface HdinsightStormClusterTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#create HdinsightStormCluster#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#delete HdinsightStormCluster#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#read HdinsightStormCluster#read}
  */
  readonly read?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#update HdinsightStormCluster#update}
  */
  readonly update?: string;
}

export function hdinsightStormClusterTimeoutsToTerraform(struct?: HdinsightStormClusterTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    delete: cdktf.stringToTerraform(struct!.delete),
    read: cdktf.stringToTerraform(struct!.read),
    update: cdktf.stringToTerraform(struct!.update),
  }
}


export function hdinsightStormClusterTimeoutsToHclTerraform(struct?: HdinsightStormClusterTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    create: {
      value: cdktf.stringToHclTerraform(struct!.create),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    delete: {
      value: cdktf.stringToHclTerraform(struct!.delete),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    read: {
      value: cdktf.stringToHclTerraform(struct!.read),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    update: {
      value: cdktf.stringToHclTerraform(struct!.update),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class HdinsightStormClusterTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): HdinsightStormClusterTimeouts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._create !== undefined) {
      hasAnyValues = true;
      internalValueResult.create = this._create;
    }
    if (this._delete !== undefined) {
      hasAnyValues = true;
      internalValueResult.delete = this._delete;
    }
    if (this._read !== undefined) {
      hasAnyValues = true;
      internalValueResult.read = this._read;
    }
    if (this._update !== undefined) {
      hasAnyValues = true;
      internalValueResult.update = this._update;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: HdinsightStormClusterTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._create = undefined;
      this._delete = undefined;
      this._read = undefined;
      this._update = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._create = value.create;
      this._delete = value.delete;
      this._read = value.read;
      this._update = value.update;
    }
  }

  // create - computed: false, optional: true, required: false
  private _create?: string; 
  public get create() {
    return this.getStringAttribute('create');
  }
  public set create(value: string) {
    this._create = value;
  }
  public resetCreate() {
    this._create = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get createInput() {
    return this._create;
  }

  // delete - computed: false, optional: true, required: false
  private _delete?: string; 
  public get delete() {
    return this.getStringAttribute('delete');
  }
  public set delete(value: string) {
    this._delete = value;
  }
  public resetDelete() {
    this._delete = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deleteInput() {
    return this._delete;
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

  // update - computed: false, optional: true, required: false
  private _update?: string; 
  public get update() {
    return this.getStringAttribute('update');
  }
  public set update(value: string) {
    this._update = value;
  }
  public resetUpdate() {
    this._update = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get updateInput() {
    return this._update;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster azurerm_hdinsight_storm_cluster}
*/
export class HdinsightStormCluster extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "azurerm_hdinsight_storm_cluster";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a HdinsightStormCluster resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the HdinsightStormCluster to import
  * @param importFromId The id of the existing HdinsightStormCluster that should be imported. Refer to the {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the HdinsightStormCluster to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "azurerm_hdinsight_storm_cluster", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/hashicorp/azurerm/2.0.0/docs/resources/hdinsight_storm_cluster azurerm_hdinsight_storm_cluster} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options HdinsightStormClusterConfig
  */
  public constructor(scope: Construct, id: string, config: HdinsightStormClusterConfig) {
    super(scope, id, {
      terraformResourceType: 'azurerm_hdinsight_storm_cluster',
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
    this._clusterVersion = config.clusterVersion;
    this._id = config.id;
    this._location = config.location;
    this._name = config.name;
    this._resourceGroupName = config.resourceGroupName;
    this._tags = config.tags;
    this._tier = config.tier;
    this._componentVersion.internalValue = config.componentVersion;
    this._gateway.internalValue = config.gateway;
    this._roles.internalValue = config.roles;
    this._storageAccount.internalValue = config.storageAccount;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // cluster_version - computed: false, optional: false, required: true
  private _clusterVersion?: string; 
  public get clusterVersion() {
    return this.getStringAttribute('cluster_version');
  }
  public set clusterVersion(value: string) {
    this._clusterVersion = value;
  }
  // Temporarily expose input value. Use with caution.
  public get clusterVersionInput() {
    return this._clusterVersion;
  }

  // https_endpoint - computed: true, optional: false, required: false
  public get httpsEndpoint() {
    return this.getStringAttribute('https_endpoint');
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

  // location - computed: false, optional: false, required: true
  private _location?: string; 
  public get location() {
    return this.getStringAttribute('location');
  }
  public set location(value: string) {
    this._location = value;
  }
  // Temporarily expose input value. Use with caution.
  public get locationInput() {
    return this._location;
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

  // ssh_endpoint - computed: true, optional: false, required: false
  public get sshEndpoint() {
    return this.getStringAttribute('ssh_endpoint');
  }

  // tags - computed: false, optional: true, required: false
  private _tags?: { [key: string]: string }; 
  public get tags() {
    return this.getStringMapAttribute('tags');
  }
  public set tags(value: { [key: string]: string }) {
    this._tags = value;
  }
  public resetTags() {
    this._tags = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tagsInput() {
    return this._tags;
  }

  // tier - computed: false, optional: false, required: true
  private _tier?: string; 
  public get tier() {
    return this.getStringAttribute('tier');
  }
  public set tier(value: string) {
    this._tier = value;
  }
  // Temporarily expose input value. Use with caution.
  public get tierInput() {
    return this._tier;
  }

  // component_version - computed: false, optional: false, required: true
  private _componentVersion = new HdinsightStormClusterComponentVersionOutputReference(this, "component_version");
  public get componentVersion() {
    return this._componentVersion;
  }
  public putComponentVersion(value: HdinsightStormClusterComponentVersion) {
    this._componentVersion.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get componentVersionInput() {
    return this._componentVersion.internalValue;
  }

  // gateway - computed: false, optional: false, required: true
  private _gateway = new HdinsightStormClusterGatewayOutputReference(this, "gateway");
  public get gateway() {
    return this._gateway;
  }
  public putGateway(value: HdinsightStormClusterGateway) {
    this._gateway.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get gatewayInput() {
    return this._gateway.internalValue;
  }

  // roles - computed: false, optional: false, required: true
  private _roles = new HdinsightStormClusterRolesOutputReference(this, "roles");
  public get roles() {
    return this._roles;
  }
  public putRoles(value: HdinsightStormClusterRoles) {
    this._roles.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get rolesInput() {
    return this._roles.internalValue;
  }

  // storage_account - computed: false, optional: true, required: false
  private _storageAccount = new HdinsightStormClusterStorageAccountList(this, "storage_account", false);
  public get storageAccount() {
    return this._storageAccount;
  }
  public putStorageAccount(value: HdinsightStormClusterStorageAccount[] | cdktf.IResolvable) {
    this._storageAccount.internalValue = value;
  }
  public resetStorageAccount() {
    this._storageAccount.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get storageAccountInput() {
    return this._storageAccount.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new HdinsightStormClusterTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: HdinsightStormClusterTimeouts) {
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
      cluster_version: cdktf.stringToTerraform(this._clusterVersion),
      id: cdktf.stringToTerraform(this._id),
      location: cdktf.stringToTerraform(this._location),
      name: cdktf.stringToTerraform(this._name),
      resource_group_name: cdktf.stringToTerraform(this._resourceGroupName),
      tags: cdktf.hashMapper(cdktf.stringToTerraform)(this._tags),
      tier: cdktf.stringToTerraform(this._tier),
      component_version: hdinsightStormClusterComponentVersionToTerraform(this._componentVersion.internalValue),
      gateway: hdinsightStormClusterGatewayToTerraform(this._gateway.internalValue),
      roles: hdinsightStormClusterRolesToTerraform(this._roles.internalValue),
      storage_account: cdktf.listMapper(hdinsightStormClusterStorageAccountToTerraform, true)(this._storageAccount.internalValue),
      timeouts: hdinsightStormClusterTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      cluster_version: {
        value: cdktf.stringToHclTerraform(this._clusterVersion),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      location: {
        value: cdktf.stringToHclTerraform(this._location),
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
      tags: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._tags),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
      },
      tier: {
        value: cdktf.stringToHclTerraform(this._tier),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      component_version: {
        value: hdinsightStormClusterComponentVersionToHclTerraform(this._componentVersion.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "HdinsightStormClusterComponentVersionList",
      },
      gateway: {
        value: hdinsightStormClusterGatewayToHclTerraform(this._gateway.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "HdinsightStormClusterGatewayList",
      },
      roles: {
        value: hdinsightStormClusterRolesToHclTerraform(this._roles.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "HdinsightStormClusterRolesList",
      },
      storage_account: {
        value: cdktf.listMapperHcl(hdinsightStormClusterStorageAccountToHclTerraform, true)(this._storageAccount.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "HdinsightStormClusterStorageAccountList",
      },
      timeouts: {
        value: hdinsightStormClusterTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "HdinsightStormClusterTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
