
output "alb_dns_name" {
  value = aws_lb.this.dns_name
}

output "alb_zone_id" {
  value = aws_lb.this.zone_id
}

output "target_group_arn" {
  value = aws_lb_target_group.this.arn
}

output "http_listener_arn" {
  value = aws_lb_listener.http_listener.arn
}

output "https_listener_arn" {
  value = aws_lb_listener.https_listener.arn
}


output "https_listener" {
  value = aws_lb_listener.https_listener
}