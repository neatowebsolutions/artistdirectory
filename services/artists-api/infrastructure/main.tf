terraform {
  backend "s3" {
    bucket = "artistdirectory-infrastructure"
    key    = "artists-api.tfstate"
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
