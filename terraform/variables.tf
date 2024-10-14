variable "vpc_cidr" {
  default     = "10.0.0.0/16"
}


variable "aws_subnet_1" {
  default = "10.0.1.0/24"
}

variable "aws_subnet_2" {
  default = "10.0.2.0/24"
}

variable "cloudflare_api_token" {
  description = "API token for Cloudflare"
  type        = string
}

variable "cloudflare_zone_id" {
  description = "Cloudflare Zone ID for the domain"
  type        = string
}


variable "threat_app_container_image" {
  description = "URI for the threat app in ECR"
  type = string
}

variable "acm_certificate_arn" {
  description = "The ARN of the ACM certificate to use for HTTPS"
  type        = string
}




