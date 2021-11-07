terraform {
  backend "s3" {
    bucket = "artistdirectory-infrastructure"
    key    = "infrastructure.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "backups" {
  count         = terraform.workspace == "production" ? 1 : 0
  bucket        = "artistdirectory-backups"
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

resource "aws_default_vpc" "default" {
  enable_dns_support   = true
  enable_dns_hostnames = true
}

output "hosted_zone_id" {
  value = var.hosted_zone_id
}

output "domain" {
  value = var.domain
}

output "assets_domain" {
  value = var.assets_domain
}
