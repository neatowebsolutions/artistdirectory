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

data "terraform_remote_state" "artistdirectory_infrastructure" {
  backend = "s3"
  config = {
    bucket = "artistdirectory-infrastructure"
    key    = "env:/${terraform.workspace}/infrastructure.tfstate"
    region = "us-east-1"
  }
}
