terraform {
  required_providers {
    aws = {
      source                = "hashicorp/aws"
      configuration_aliases = [aws.region]
    }
  }
}

data "aws_region" "current" {
  provider = aws.region
}

data "terraform_remote_state" "template_infrastructure" {
  backend = "s3"
  config = {
    bucket = "neatowebsolutions-template-infrastructure"
    key    = "env:/${terraform.workspace}/infrastructure.tfstate"
    region = "us-east-1"
  }
}

resource "aws_ssm_parameter" "example_api_gateway_domain" {
  name      = "/template/${terraform.workspace}/example-api-gateway/domain"
  type      = "String"
  value     = var.example_api_gateway_domain
  overwrite = true
  provider  = aws.region
}

resource "aws_ssm_parameter" "example_api_gateway_url" {
  name      = "/template/${terraform.workspace}/example-api-gateway/url"
  type      = "String"
  value     = "https://${var.example_api_gateway_domain}"
  overwrite = true
  provider  = aws.region
}

resource "aws_route53_health_check" "example_api_gateway" {
  fqdn              = aws_ssm_parameter.example_api_gateway_domain.value
  port              = 443
  type              = "HTTPS"
  resource_path     = "/health"
  failure_threshold = "5"
  request_interval  = "30"
}

resource "aws_ssm_parameter" "example_api_gateway_health_check_id" {
  name      = "/template/${terraform.workspace}/example-api-gateway/health-check-id"
  type      = "String"
  value     = aws_route53_health_check.example_api_gateway.id
  overwrite = true
  provider  = aws.region
}
