locals {
  domain = "logs-api.${data.terraform_remote_state.artistdirectory_infrastructure.outputs.domain}"
}

resource "aws_ssm_parameter" "mongodb_logs_database_url" {
  name      = "/artistdirectory/${terraform.workspace}/database/mongodb-logs/url"
  type      = "SecureString"
  value     = "mongodb://app:${var.mongodb_app_password}@services.artistdirectory.co/artistdirectory-logs?replicaSet=rs0&readPreference=secondaryPreferred&ssl=true"
  overwrite = true
}

resource "aws_ssm_parameter" "logs_api_domain" {
  name      = "/artistdirectory/${terraform.workspace}/logs-api/domain"
  type      = "String"
  value     = local.domain
  overwrite = true
}

resource "aws_ssm_parameter" "logs_api_url" {
  name      = "/artistdirectory/${terraform.workspace}/logs-api/url"
  type      = "String"
  value     = "https://${local.domain}"
  overwrite = true
}
