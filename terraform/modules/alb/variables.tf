variable "vpc_id" {
  description = "VPC ID where the ALB will be deployed"
  type        = string
}

variable "public_subnet_ids" {
  default = "10.0.1.0/24"
}

variable "security_group_id" {
  description = "Security group for the ALB"
  type        = string
}

variable "certificate_arn" {
  description = "ARN of the SSL certificate for HTTPS listener"
  type        = string
}

variable "project_name" {
  description = "Project name prefix"
  type        = string
}
