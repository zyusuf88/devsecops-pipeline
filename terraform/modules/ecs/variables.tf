variable "container_image" {
  description = "ECR Image for the container"
  type        = string
  default     = "730335356758.dkr.ecr.eu-west-2.amazonaws.com/threat-app-1:latest"
}
variable "certificate_arn" {
  description = "The ARN of the ACM certificate"
  type        = string
}
variable "zone_name" {
  description = "Domain name for the app"
  type        = string
  default     = "tm.yzeynab.com"
}

variable "execution_role_arn" {
  description = "ARN of the ECS task execution role"
  type        = string
}

variable "task_role_arn" {
  description = "ARN of the ECS task role"
  type        = string
}

variable "security_group_id" {
  description = "Security group for ECS service"
  type        = string
}

variable "subnet_ids" {
  description = "List of public subnet IDs for ALB and ECS"
  type        = list(string)
}


variable "domain_name" {
  default = "tm.yzeynab.com"
}

variable "vpc_id" {
  description = "VPC ID where the ALB will be deployed"
  type        = string
}

variable "project_name" {
  description = "Project name prefix"
  type        = string
}

variable "alb_dns_name" {
  description = "DNS name of the ALB"
  type        = string
}

variable "target_group_arn" {
  description = "ARN of the ALB target group"
  type        = string
}

variable "alb_listener" {
  description = "ALB HTTPS listener"
  type        = any  
}

variable "http_listener_arn" {
  description = "ARN of the HTTP listener"
  type        = string
}

variable "https_listener_arn" {
  description = "ARN of the HTTPS listener"
  type        = string
}
