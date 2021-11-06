terraform {
  backend "s3" {
    bucket = "neatowebsolutions-artistdirectory-infrastructure"
    key    = "infrastructure.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = "us-east-1"
}

provider "aws" {
  alias  = "us-west-2"
  region = "us-west-2"
}

provider "aws" {
  alias  = "us-east-2"
  region = "us-east-2"
}

provider "aws" {
  alias  = "eu-west-1"
  region = "eu-west-1"
}

provider "aws" {
  alias  = "ap-northeast-1"
  region = "ap-northeast-1"
}

resource "aws_s3_bucket" "backups" {
  count         = terraform.workspace == "production" ? 1 : 0
  bucket        = "neatowebsolutions-artistdirectory-backups"
  acl           = "private"
  force_destroy = false

  lifecycle_rule {
    enabled                                = true
    prefix                                 = "database/"
    abort_incomplete_multipart_upload_days = 1

    transition {
      days          = 7
      storage_class = "GLACIER"
    }

    expiration {
      days = 90
    }
  }
}

module "us_east_1" {
  source = "./region"
  providers = {
    aws.region = aws
  }

  hosted_zone_id = var.hosted_zone_id
  base_domain    = var.base_domain
  sandbox        = var.sandbox
  jwt_secret     = var.jwt_secret
  assets_domain  = var.assets_domain
}

module "us_west_2" {
  count  = terraform.workspace == "production" ? 1 : 0
  source = "./region"
  providers = {
    aws.region = aws.us-west-2
  }

  hosted_zone_id = var.hosted_zone_id
  base_domain    = var.base_domain
  sandbox        = var.sandbox
  jwt_secret     = var.jwt_secret
  assets_domain  = var.assets_domain
}

module "us_east_2" {
  count  = terraform.workspace == "production" ? 1 : 0
  source = "./region"
  providers = {
    aws.region = aws.us-east-2
  }

  hosted_zone_id = var.hosted_zone_id
  base_domain    = var.base_domain
  sandbox        = var.sandbox
  jwt_secret     = var.jwt_secret
  assets_domain  = var.assets_domain
}

module "eu_west_1" {
  count  = terraform.workspace == "production" ? 1 : 0
  source = "./region"
  providers = {
    aws.region = aws.eu-west-1
  }

  hosted_zone_id = var.hosted_zone_id
  base_domain    = var.base_domain
  sandbox        = var.sandbox
  jwt_secret     = var.jwt_secret
  assets_domain  = var.assets_domain
}

module "ap_northeast_1" {
  count  = terraform.workspace == "production" ? 1 : 0
  source = "./region"
  providers = {
    aws.region = aws.ap-northeast-1
  }

  hosted_zone_id = var.hosted_zone_id
  base_domain    = var.base_domain
  sandbox        = var.sandbox
  jwt_secret     = var.jwt_secret
  assets_domain  = var.assets_domain
}

module "assets" {
  count  = terraform.workspace == "test" ? 1 : 0
  source = "./assets"
  providers = {
    aws.region = aws
  }

  certificate_arn = module.us_east_1.certificate_arn
  hosted_zone_id  = var.hosted_zone_id
  assets_domain   = var.assets_domain
}

output "domain" {
  value = var.domain
}

output "assets_domain" {
  value = var.assets_domain
}
