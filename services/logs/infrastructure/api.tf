locals {
  domain = "logs-api.${data.terraform_remote_state.artistdirectory_infrastructure.outputs.domain}"
}

resource "aws_ssm_parameter" "mongodb_logs_database_url" {
  name      = "/artistdirectory/${terraform.workspace}/database/mongodb-logs/url"
  type      = "SecureString"
  value     = "mongodb+srv://admin:${var.mongodb_app_password}@rs0.eceh0.mongodb.net/artistdirectory-directory?replicaSet=rs0&retryWrites=true&w=majority&wtimeoutMS=5000"
  overwrite = true
  provider  = aws.region
}

resource "aws_ssm_parameter" "logs_api_regional_domain" {
  name      = "/artistdirectory/${terraform.workspace}/logs-api/regional-domain"
  type      = "String"
  value     = local.domain
  overwrite = true
  provider  = aws.region
}

resource "aws_ssm_parameter" "logs_api_url" {
  name      = "/artistdirectory/${terraform.workspace}/logs-api/url"
  type      = "String"
  value     = "https://${local.domain}"
  overwrite = true
  provider  = aws.region
}
