variable "container_image" {
  description = "ECR Image for the container"
  type        = string
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


variable "vpc_id" {
  description = "VPC ID where the ALB will be deployed"
  type        = string
}

variable "target_group_arn" {
  description = "ARN of the ALB target group"
  type        = string
}

variable "http_listener_arn" {
  description = "ARN of the HTTP listener"
  type        = string
}

variable "https_listener_arn" {
  description = "ARN of the HTTPS listener"
  type        = string
}
