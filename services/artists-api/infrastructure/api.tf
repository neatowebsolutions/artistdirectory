locals {
  domain = "artists-api.${data.terraform_remote_state.artistdirectory_infrastructure.outputs.domain}"
}

resource "aws_ssm_parameter" "mongodb_directory_database_url" {
  name      = "/artistdirectory/${terraform.workspace}/database/mongodb-directory/url"
  type      = "SecureString"
  value     = "mongodb://app:${var.mongodb_app_password}@services.artistdirectory.co/artistdirectory-directory?replicaSet=rs0&readPreference=secondaryPreferred&ssl=true"
  overwrite = true
}

resource "aws_ssm_parameter" "directory_api_domain" {
  name      = "/artistdirectory/${terraform.workspace}/artists-api/domain"
  type      = "String"
  value     = local.domain
  overwrite = true
}

resource "aws_ssm_parameter" "artists_api_url" {
  name      = "/artistdirectory/${terraform.workspace}/artists-api/url"
  type      = "String"
  value     = "https://${local.domain}"
  overwrite = true
}
