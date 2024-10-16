output "alb_url" {
  description = "The URL of the Application Load Balancer"
  value       = aws_lb.threat_model_app_lb.dns_name
}
