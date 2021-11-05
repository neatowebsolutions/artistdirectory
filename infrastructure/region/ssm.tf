resource "aws_ssm_parameter" "certificate_name" {
  name      = "/template/${terraform.workspace}/certificate-name"
  type      = "String"
  value     = "domain.com"
  overwrite = true
  provider  = aws.region
}

resource "aws_ssm_parameter" "sandbox" {
  name      = "/template/${terraform.workspace}/sandbox"
  type      = "String"
  value     = var.sandbox
  overwrite = true
  provider  = aws.region
}

resource "aws_ssm_parameter" "jwt_secret" {
  name      = "/template/${terraform.workspace}/jwt-secret"
  type      = "SecureString"
  value     = var.jwt_secret
  overwrite = true
  provider  = aws.region
}

resource "aws_ssm_parameter" "assets_domain" {
  name      = "/template/${terraform.workspace}/assets/domain"
  type      = "String"
  value     = var.assets_domain
  overwrite = true
  provider  = aws.region
}

resource "aws_ssm_parameter" "assets_url" {
  name      = "/template/${terraform.workspace}/assets/url"
  type      = "String"
  value     = "https://${var.assets_domain}"
  overwrite = true
  provider  = aws.region
}
