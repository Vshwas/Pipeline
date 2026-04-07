variable "Admin_Enabled" {
  type        = bool
  description = " Optional$Specifies whether the admin user is enabled. Defaults to false.**Valid Inputs:true or false, Example:false"
  default     = false
}

variable "Backend_Container_Name" {
  type        = string
  description = " Required$Container name for  backend"
}

variable "Backend_Key" {
  type        = string
  description = " Required$Key Name for azurerm backend"
}

variable "Backend_Resource_Group_Name" {
  type        = string
  description = " Required$Resource Group name for azurerm backend"
}

variable "Backend_Storage_Account_Name" {
  type        = string
  description = " Required$Storage AccountName name for backend"
}

variable "Client_Id" {
  type        = string
  description = " Required$Azure clientId "
}

variable "Client_Secret" {
  type        = string
  description = " Required$Azure client Secret ID"
}

variable "Container_Name" {
  type        = string
  description = " Required$The  name of the container registry.**Casing:Case insensitive, Valid Characters:Alphanumerics, Length:5-50, Example:icaACR01"
}

variable "Environment" {
  type        = string
  description = " Required$Resource group environment name required here**Casing:Case insensitive, Valid Characters:Alphanumerics,Length:1-256, Example:Development"
}

variable "Location" {
  type        = string
  description = "Required$Specifies the supported Azure location where the resource exists. Changing this forces a new resource to be created.**Casing:Lower case, Valid Characters:Location name without spaces, Example:centralindia"
}

variable "Project_Name" {
  type        = string
  description = " Required$Project Name required here **Casing:Case insensitive, Valid Characters:Alphanumerics,Length:1-256, Example:ICloudAccelarator"
}

variable "Purpose" {
  type        = string
  description = " Required$Purpose of the resource required here **Casing:Case insensitive, Valid Characters:Alphanumerics,Length:1-256, Example:ICAProject"
}

variable "Resource_Group_Name" {
  type        = string
  description = "Required$Resource group name required here**Casing:Case insensitive, Valid Characters:Alphanumerics, underscores, parenthesis, hyphens, periods, Length:1-90, Example:ICA-Project01"
}

variable "SKU" {
  type        = string
  description = " Required$The SKU name of the container registry.**Valid Inputs: Basic, Standard and Premium, Example:Standard"
}

variable "Subscription_Id" {
  type        = string
  description = " Required$Azure Subscription ID"
}

variable "Tenant_Id" {
  type        = string
  description = " Required$Azure tenant ID"
}
