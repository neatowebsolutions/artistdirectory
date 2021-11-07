terraform {
  backend "s3" {
    bucket = "artistdirectory-infrastructure"
    key    = "directory.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = "us-east-1"
}

data "terraform_remote_state" "artistdirectory_infrastructure" {
  backend = "s3"
  config = {
    bucket = "artistdirectory-infrastructure"
    key    = "env:/${terraform.workspace}/infrastructure.tfstate"
    region = "us-east-1"
  }
}

resource "aws_ssm_parameter" "shopify_admin_app_root_domain" {
  name      = "/artistdirectory/${terraform.workspace}/directory-app/gateway-domain"
  type      = "String"
  value     = directory_gateway_app_domain
  overwrite = true
}

resource "aws_ssm_parameter" "directory_app_domain" {
  name      = "/artistdirectory/${terraform.workspace}/directory-app/domain"
  type      = "String"
  value     = var.directory_app_domain
  overwrite = true
}

resource "aws_ssm_parameter" "directory_app_url" {
  name      = "/artistdirectory/${terraform.workspace}/directory-app/url"
  type      = "String"
  value     = "https://${var.directory_app_domain}"
  overwrite = true
}

resource "aws_route53_health_check" "directory_app" {
  fqdn              = aws_ssm_parameter.directory_app_domain.value
  port              = 443
  type              = "HTTPS"
  resource_path     = "/health"
  failure_threshold = "5"
  request_interval  = "30"
}

resource "aws_ssm_parameter" "directory_app_health_check_id" {
  name      = "/artistdirectory/${terraform.workspace}/directory-app/health-check-id"
  type      = "String"
  value     = aws_route53_health_check.directory_app.id
  overwrite = true
}
