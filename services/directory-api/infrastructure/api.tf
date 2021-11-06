locals {
  domain = "directory-api.${data.terraform_remote_state.artistdirectory_infrastructure.outputs.domain}"
}

resource "aws_ssm_parameter" "mongodb_directory_database_url" {
  name      = "/artistdirectory/${terraform.workspace}/database/mongodb-directory/url"
  type      = "SecureString"
  value     = "mongodb+srv://admin:${var.mongodb_app_password}@rs0.eceh0.mongodb.net/artistdirectory-directory?retryWrites=true&w=majority&wtimeoutMS=5000"
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
