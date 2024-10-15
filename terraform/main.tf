
terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~> 5.0"
    }
    cloudflare = {
      source = "cloudflare/cloudflare"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region = "eu-west-2"
}

# VPC Configuration
resource "aws_vpc" "tm_vpc" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "tm-vpc"
  }
}

# Subnets
resource "aws_subnet" "pb_subnet_1" {
  vpc_id            = aws_vpc.tm_vpc.id
  cidr_block        = var.aws_subnet_1
  availability_zone = "eu-west-2a"

  tags = {
    Name = "pb-subnet-1"
  }
}

resource "aws_subnet" "pb_subnet_2" {
  vpc_id            = aws_vpc.tm_vpc.id
  cidr_block        = var.aws_subnet_2
  availability_zone = "eu-west-2b"

  tags = {
    Name = "pb-subnet-2"
  }
}

# Security Group
resource "aws_security_group" "app_sg" {
  vpc_id = aws_vpc.tm_vpc.id

  name = "app-sg"
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "app-sg"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "tm_igw" {
  vpc_id = aws_vpc.tm_vpc.id

  tags = {
    Name = "tm-igw"
  }
}

# Route Table
resource "aws_route_table" "app_rt" {
  vpc_id = aws_vpc.tm_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.tm_igw.id
  }

  tags = {
    Name = "app-rt"
  }
}

# Route Table Associations
resource "aws_route_table_association" "assoc_pb_subnet_1" {
  subnet_id      = aws_subnet.pb_subnet_1.id
  route_table_id = aws_route_table.app_rt.id
}

resource "aws_route_table_association" "assoc_pb_subnet_2" {
  subnet_id      = aws_subnet.pb_subnet_2.id
  route_table_id = aws_route_table.app_rt.id
}

# Application Load Balancer (ALB)
resource "aws_lb" "threat_model_app_lb" {
  name               = "app-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.app_sg.id]
  subnets            = [aws_subnet.pb_subnet_1.id, aws_subnet.pb_subnet_2.id]

  lifecycle {
    prevent_destroy = true 
  }

  tags = {
    Name = "app-lb"
  }
}

# ALB Target Group
resource "aws_lb_target_group" "tm_tg" {
  name        = "tm-tg"
  port        = 3000
  protocol    = "HTTP"
  vpc_id      = aws_vpc.tm_vpc.id
  target_type = "ip"

  health_check {
    path     = "/"
    protocol = "HTTP"
}
  lifecycle {
    prevent_destroy = true
  }
}

# ALB Listeners
resource "aws_lb_listener" "http_listener" {
  load_balancer_arn = aws_lb.threat_model_app_lb.arn
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
  load_balancer_arn = aws_lb.threat_model_app_lb.arn
  port              = 443
  protocol          = "HTTPS"
  certificate_arn   = data.aws_acm_certificate.app_cert.arn
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.tm_tg.arn
  }

}

# Cloudflare provider setup
provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

#refrence exisisting ACM certificate
data "aws_acm_certificate" "cert" {
  domain   = "encord.zeynabyusuf.com"
  statuses = ["ISSUED"]
}


# Cloudflare CNAME Record to Point to ALB
resource "cloudflare_record" "alb_cname_record" {
  zone_id = var.cloudflare_zone_id
  name    = "encord"
  type    = "CNAME"
  value   = aws_lb.threat_model_app_lb.dns_name
  ttl     = 300
  proxied = false
}

# ECS Cluster
resource "aws_ecs_cluster" "threat_model_cluster" {
  name = "threat-model-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

# ECS Task Definition
resource "aws_ecs_task_definition" "threat_app_td" {
  family                   = "threat-app-td"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  execution_role_arn       = data.aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = data.aws_iam_role.ecs_task_execution_role.arn
  cpu                      = "1024"
  memory                   = "3072"

  container_definitions = jsonencode([
    {
      name      = "tm-container"
      image     = var.threat_app_container_image
      cpu       = 0
      essential = true
      portMappings = [{
        containerPort = 3000
        hostPort      = 3000
        protocol      = "tcp"
      }]
    }
  ])
}

# ECS Service
resource "aws_ecs_service" "threat_app_service" {
  name            = "my-tm-service"
  cluster         = aws_ecs_cluster.threat_model_cluster.id
  task_definition = aws_ecs_task_definition.threat_app_td.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    assign_public_ip = true
    subnets          = [aws_subnet.pb_subnet_1.id, aws_subnet.pb_subnet_2.id]
    security_groups  = [aws_security_group.app_sg.id]
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.tm_tg.arn
    container_name   = "tm-container"
    container_port   = 3000
  }

  deployment_controller {
    type = "ECS"
  }

  depends_on = [aws_lb_listener.http_listener, aws_lb_listener.https_listener]
}

# IAM Role and Policy Attachment for ECS Task Execution
data "aws_iam_role" "ecs_task_execution_role" {
  name = "ecs-task-execution-role"
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_policy" {
  role       = data.aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}
