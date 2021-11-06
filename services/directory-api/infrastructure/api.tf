locals {
  domain = "directory-api.${data.terraform_remote_state.artistdirectory_infrastructure.outputs.domain}"
}

resource "aws_ssm_parameter" "mongodb_directory_database_url" {
  name      = "/artistdirectory/${terraform.workspace}/database/mongodb-directory/url"
  type      = "SecureString"
  value     = "mongodb://app:${var.mongodb_app_password}@rs0.eceh0.mongodb.net/artistdirectory-directory?readPreference=secondaryPreferred&w=1&wtimeoutMS=5000&ssl=true"
  overwrite = true
}

resource "aws_ssm_parameter" "directory_api_domain" {
  name      = "/artistdirectory/${terraform.workspace}/directory-api/domain"
  type      = "String"
  value     = local.domain
  overwrite = true
}

resource "aws_ssm_parameter" "directory_api_url" {
  name      = "/artistdirectory/${terraform.workspace}/directory-api/url"
  type      = "String"
  value     = "https://${local.domain}"
  overwrite = true
}
