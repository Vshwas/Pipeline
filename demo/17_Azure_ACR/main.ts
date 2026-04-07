import { Construct } from "constructs";
import { App, AzurermBackend, TerraformLocal, TerraformStack, TerraformVariable } from "cdktf";
import { AzurermProvider } from "./.gen/providers/azurerm/provider";
import { ContainerRegistry } from "./.gen/providers/azurerm/container-registry";


class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

  const Resource_Group_Name=new TerraformVariable(this, "Resource_Group_Name",
    {
     type:"string",
     description:"Required$Resource group name required here**Casing:Case insensitive, Valid Characters:Alphanumerics, underscores, parenthesis, hyphens, periods, Length:1-90, Example:ICA-Project01"
    });
    const Location=new TerraformVariable(this, "Location",
    {
      type:"string",
      description:"Required$Specifies the supported Azure location where the resource exists. Changing this forces a new resource to be created.**Casing:Lower case, Valid Characters:Location name without spaces, Example:centralindia"
    });
    const Environment=new TerraformVariable(this, "Environment",
    {
      type:"string",
      description:" Required$Resource group environment name required here**Casing:Case insensitive, Valid Characters:Alphanumerics,Length:1-256, Example:Development"
    });
    const Project_Name=new TerraformVariable(this, "Project_Name",
    {
      type:"string",
      description:" Required$Project Name required here **Casing:Case insensitive, Valid Characters:Alphanumerics,Length:1-256, Example:ICloudAccelarator"
    });
    const Purpose=new TerraformVariable(this, "Purpose",
    {
      type:"string",
      description:" Required$Purpose of the resource required here **Casing:Case insensitive, Valid Characters:Alphanumerics,Length:1-256, Example:ICAProject"
    });

    const commonTags = new TerraformLocal(this, "common_tags",
    {
      Environment   : Environment.value,
      Project_Name  : Project_Name.value,
      Purpose       : Purpose.value
    });

     const Backend_Resource_Group_Name=new TerraformVariable(this, "Backend_Resource_Group_Name",
    {
      type:"string",
      description:" Required$Resource Group name for azurerm backend"
    });
     const Backend_Storage_Account_Name=new TerraformVariable(this, "Backend_Storage_Account_Name",
    {
      type:"string",
      description: " Required$Storage AccountName name for backend"
    });
    const Backend_Container_Name=new TerraformVariable(this, "Backend_Container_Name",
    {
      type:"string",
      description:" Required$Container name for  backend"
    });
    const Backend_Key=new TerraformVariable(this, "Backend_Key",
    {
      type:"string",
      description:" Required$Key Name for azurerm backend"
    });
       const Subscription_Id=new TerraformVariable(this, "Subscription_Id",
    { type:"string",
      description:" Required$Azure Subscription ID"
    });
       const Tenant_Id=new TerraformVariable(this, "Tenant_Id",
    {
      type:"string",
      description:" Required$Azure tenant ID"
    });
       const Client_Id=new TerraformVariable(this, "Client_Id",
    {
      type:"string",
      description:" Required$Azure clientId "
    });
       const Client_Secret=new TerraformVariable(this, "Client_Secret",
    {
      type:"string",
      description:" Required$Azure client Secret ID"
    });
    new AzurermProvider(this, "AzureRm", {
    subscriptionId:Subscription_Id.value,
    tenantId:Tenant_Id.value,
    clientId:Client_Id.value,
    clientSecret:Client_Secret.value,
      features: [{}],
    })

    new AzurermBackend(this, {
      resourceGroupName: Backend_Resource_Group_Name.value,
      storageAccountName: Backend_Storage_Account_Name.value,
      containerName: Backend_Container_Name.value,
      key:Backend_Key.value,
      subscriptionId:Subscription_Id.value,
      tenantId:Tenant_Id.value,
      clientId:Client_Id.value,
      clientSecret:Client_Secret.value,
    });

      const Container_Name=new TerraformVariable(this, "Container_Name",
    { type:"string",
      description:" Required$The  name of the container registry.**Casing:Case insensitive, Valid Characters:Alphanumerics, Length:5-50, Example:icaACR01"
    });

       const SKU=new TerraformVariable(this, "SKU",
    { type:"string",
      description:" Required$The SKU name of the container registry.**Valid Inputs: Basic, Standard and Premium, Example:Standard"
    });
        const Admin_Enabled=new TerraformVariable(this, "Admin_Enabled",
    {default:false,
       type:"bool",
      description:" Optional$Specifies whether the admin user is enabled. Defaults to false.**Valid Inputs:true or false, Example:false"
    });
      const Public_Network_Access_Enabled=new TerraformVariable(this, "Public_Network_Access_Enabled",
    {default:true,
       type:"bool",
      description:"Optional$Whether public network access is allowed for the container registry. Defaults to true.**Valid Inputs:true or false, Example:true"
    });
      const Zone_Redundancy_Enabled=new TerraformVariable(this, "Zone_Redundancy_Enabled",
    {default:false,
       type:"bool",
      description:"Optional$Whether zone redundancy is enabled for this Container Registry? Changing this forces a new resource to be created. Defaults to false.**Valid Inputs:true or false, Example:false"
    });
     const Retention_Policy_Days=new TerraformVariable(this, "Retention_Policy_Days",
    {default:7,
       type:"number",
      description:" Optional$The number of days to retain an untagged manifest after which it gets purged. Default is 7.**Valid Characters:Number, Example:7"
    });


 new ContainerRegistry(this,"AzureContainerRegistry",{
      name:Container_Name.value,
      resourceGroupName:Resource_Group_Name.value,
      location:Location.value,
      tags:commonTags.expression,
      sku:SKU.value,
      adminEnabled:Admin_Enabled.value,
      publicNetworkAccessEnabled:Public_Network_Access_Enabled.value,
      zoneRedundancyEnabled:Zone_Redundancy_Enabled.value,
      retentionPolicyInDays:Retention_Policy_Days.value
    })

  }
}

const app = new App();
new MyStack(app, "17_Azure_ACR");
app.synth();
