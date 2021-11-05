locals {
  mongodb_hosts = "${join(":27017,", data.terraform_remote_state.template_infrastructure.outputs.services_domain_names)}:27017"
  domain        = "example-api.${data.aws_region.current.name}.${data.terraform_remote_state.template_infrastructure.outputs.domain}"
}

resource "aws_ssm_parameter" "mongodb_example_database_url" {
  name      = "/template/${terraform.workspace}/database/mongodb-example/url"
  type      = "SecureString"
  value     = "mongodb://app:${var.mongodb_app_password}@${local.mongodb_hosts}/template-example?replicaSet=rs0&readPreference=secondaryPreferred&w=1&wtimeoutMS=5000&ssl=true"
  overwrite = true
  provider  = aws.region
}

resource "aws_ssm_parameter" "example_api_regional_domain" {
  name      = "/template/${terraform.workspace}/example-api/regional-domain"
  type      = "String"
  value     = local.domain
  overwrite = true
  provider  = aws.region
}

resource "aws_ssm_parameter" "example_api_url" {
  name      = "/template/${terraform.workspace}/example-api/url"
  type      = "String"
  value     = "https://${local.domain}"
  overwrite = true
  provider  = aws.region
}
