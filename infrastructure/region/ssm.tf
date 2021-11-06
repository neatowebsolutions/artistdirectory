resource "aws_ssm_parameter" "certificate_name" {
  name      = "/artistdirectory/${terraform.workspace}/certificate-name"
  type      = "String"
  value     = "domain.com"
  overwrite = true
  provider  = aws.region
}

resource "aws_ssm_parameter" "sandbox" {
  name      = "/artistdirectory/${terraform.workspace}/sandbox"
  type      = "String"
  value     = var.sandbox
  overwrite = true
  provider  = aws.region
}

resource "aws_ssm_parameter" "jwt_secret" {
  name      = "/artistdirectory/${terraform.workspace}/jwt-secret"
  type      = "SecureString"
  value     = var.jwt_secret
  overwrite = true
  provider  = aws.region
}

resource "aws_ssm_parameter" "assets_domain" {
  name      = "/artistdirectory/${terraform.workspace}/assets/domain"
  type      = "String"
  value     = var.assets_domain
  overwrite = true
  provider  = aws.region
}

resource "aws_ssm_parameter" "assets_url" {
  name      = "/artistdirectory/${terraform.workspace}/assets/url"
  type      = "String"
  value     = "https://${var.assets_domain}"
  overwrite = true
  provider  = aws.region
}
