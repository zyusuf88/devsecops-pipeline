variable "project_name" {
  description = "Project name prefix"
  type        = string
}

variable "domain_name" {
  description = "Domain name for the application"
  type        = string
}


variable "record_name" {
  description = "The subdomain or record name (e.g., tm)"
  type        = string
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "az_1" {
  description = "Availability Zone for first public subnet"
  type        = string
  default = "eu-west-2a"
}

variable "az_2" {
  description = "Availability Zone for second public subnet"
  type        = string
  default = "eu-west-2b"
}

variable "region" {
  default = "eu-west-2"
}

variable "public_subnet_1" {
  description = "CIDR block for first public subnet"
  type        = string
  default     = "10.0.1.0/24"
}

variable "public_subnet_2" {
  description = "CIDR block for second public subnet"
  type        = string
  default     = "10.0.2.0/24"
}

variable "allowed_cidr_blocks" {
  description = "List of CIDR blocks allowed to access the services"
  type        = list(string)
  default     = ["0.0.0.0/0"]
}

variable "execution_role_arn" {
  description = "ARN of the ECS task execution role"
  type        = string
}

variable "task_role_arn" {
  description = "ARN of the ECS task role"
  type        = string
}

variable "container_image" {
  type = string
}
