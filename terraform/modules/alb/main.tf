resource "aws_lb" "this" {
  drop_invalid_header_fields = true 
  name               = "app-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [var.security_group_id]
  subnets            = var.public_subnet_ids

  tags = {
    Name = "app-lb"
  }

}

resource "aws_lb_target_group" "this" {
  name        = "tm-tg"
  port        = 3000
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"
  deregistration_delay = "30"  
  slow_start = 30            

health_check {
    enabled             = true
    healthy_threshold   = 2
    interval            = 30        
    matcher             = "200-499"  
    path                = "/"
    port                = 3000
    protocol            = "HTTP"
    timeout             = 5        
    unhealthy_threshold = 2
}

  
  depends_on = [ aws_lb.this ]
}

resource "aws_lb_listener" "http_listener" {
  load_balancer_arn = aws_lb.this.arn
  port              = 80
  protocol          = "HTTP"
  default_action {
    type = "redirect"
    redirect {
      protocol    = "HTTPS"
      port        = "443"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_lb_listener" "https_listener" {
  
  load_balancer_arn = aws_lb.this.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS-1-2-2017-01"  
  certificate_arn   = var.certificate_arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.this.arn
    
}
}
