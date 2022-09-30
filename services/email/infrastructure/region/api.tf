locals {
  domain = "email-api.${data.terraform_remote_state.artistdirectory_infrastructure.outputs.domain}"
}

resource "aws_ssm_parameter" "email_api_regional_domain" {
  name      = "/artistdirectory/${terraform.workspace}/email-api/regional-domain"
  type      = "String"
  value     = local.domain
  overwrite = true
}

resource "aws_ssm_parameter" "email_api_url" {
  name      = "/artistdirectory/${terraform.workspace}/email-api/url"
  type      = "String"
  value     = "https://${local.domain}"
  overwrite = true
}
