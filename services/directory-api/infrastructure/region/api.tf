locals {
  mongodb_hosts = "${join(":27017,", data.terraform_remote_state.artistdirectory_infrastructure.outputs.services_domain_names)}:27017"
  domain        = "directory-api.${data.aws_region.current.name}.${data.terraform_remote_state.artistdirectory_infrastructure.outputs.domain}"
}

resource "aws_ssm_parameter" "mongodb_directory_database_url" {
  name      = "/artistdirectory/${terraform.workspace}/database/mongodb-directory/url"
  type      = "SecureString"
  value     = "mongodb://app:${var.mongodb_app_password}@${local.mongodb_hosts}/artistdirectory-directory?replicaSet=rs0&readPreference=secondaryPreferred&w=1&wtimeoutMS=5000&ssl=true"
  overwrite = true
  provider  = aws.region
}

resource "aws_ssm_parameter" "directory_api_regional_domain" {
  name      = "/artistdirectory/${terraform.workspace}/directory-api/regional-domain"
  type      = "String"
  value     = local.domain
  overwrite = true
  provider  = aws.region
}

resource "aws_ssm_parameter" "directory_api_url" {
  name      = "/artistdirectory/${terraform.workspace}/directory-api/url"
  type      = "String"
  value     = "https://${local.domain}"
  overwrite = true
  provider  = aws.region
}
