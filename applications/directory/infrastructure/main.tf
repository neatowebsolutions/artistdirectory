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

provider "aws" {
  alias  = "eu-west-1"
  region = "eu-west-1"
}

provider "aws" {
  alias  = "ap-northeast-1"
  region = "ap-northeast-1"
}

module "us_east_1" {
  source = "./region"
  providers = {
    aws.region = aws
  }

  directory_app_domain = var.directory_app_domain
}

module "eu_west_1" {
  count  = terraform.workspace == "production" ? 1 : 0
  source = "./region"
  providers = {
    aws.region = aws.eu-west-1
  }

  directory_app_domain = var.directory_app_domain
}

module "ap_northeast_1" {
  count  = terraform.workspace == "production" ? 1 : 0
  source = "./region"
  providers = {
    aws.region = aws.ap-northeast-1
  }

  directory_app_domain = var.directory_app_domain
}
