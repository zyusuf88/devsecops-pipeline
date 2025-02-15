terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {}  
}

provider "aws" {
  region = var.region
  
}


data "aws_secretsmanager_secret" "terraform_state_bucket" {
  name = "terraform-state-bucket"
}

data "aws_secretsmanager_secret_version" "terraform_state_bucket" {
  secret_id = data.aws_secretsmanager_secret.terraform_state_bucket.id
}

data "aws_secretsmanager_secret" "terraform_lock_table" {
  name = "terraform-lock-table"
}

data "aws_secretsmanager_secret_version" "terraform_lock_table" {
  secret_id = data.aws_secretsmanager_secret.terraform_lock_table.id
}








