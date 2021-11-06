terraform {
  backend "s3" {
    bucket = "artistdirectory-infrastructure"
    key    = "directory-api.tfstate"
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

resource "aws_ssm_parameter" "directory_api_domain" {
  name      = "/artistdirectory/${terraform.workspace}/directory-api/domain"
  type      = "String"
  value     = var.directory_api_domain
  overwrite = true
}

resource "aws_ssm_parameter" "DIRECTORY_API_URL" {
  name      = "/artistdirectory/${terraform.workspace}/directory-api/url"
  type      = "String"
  value     = "https://${var.directory_api_domain}"
  overwrite = true
}

resource "aws_route53_health_check" "directory_api" {
  fqdn              = aws_ssm_parameter.directory_api_domain.value
  port              = 443
  type              = "HTTPS"
  resource_path     = "/health"
  failure_threshold = "5"
  request_interval  = "30"
}

resource "aws_ssm_parameter" "directory_api_health_check_id" {
  name      = "/artistdirectory/${terraform.workspace}/directory-api/health-check-id"
  type      = "String"
  value     = aws_route53_health_check.directory_api.id
  overwrite = true
}
