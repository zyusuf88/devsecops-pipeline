
resource "aws_ecs_cluster" "threat_app_cluster" {
  name = "threat-app-cluster"
 #checkov requirement
  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

resource "aws_ecs_task_definition" "this" {
  family                   = "threat-app-td"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
 # task_role_arn       = var.task_role_arn
  execution_role_arn  = var.execution_role_arn
  cpu                     = 512
  memory                  = 1024

  container_definitions = jsonencode([
    {
      name                 = "threat-app-1"
      image                = var.container_image
      cpu                  = 256
      memory               = 1024
      memoryReservation    = 512
      essential            = true


      portMappings = [
        {
          name           = "container-port"
          containerPort  = 3000
          hostPort      = 3000
          protocol      = "tcp"
          appProtocol   = "http"
        }
      ]
    }
  ])

  runtime_platform {
    cpu_architecture        = "X86_64"
    operating_system_family = "LINUX"
  }
}


# ECS Service
resource "aws_ecs_service" "this" {
  name            = "threat-app-service"
  cluster         = aws_ecs_cluster.threat_app_cluster.id
  task_definition = aws_ecs_task_definition.this.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
   assign_public_ip = true
    subnets         = var.subnet_ids
    security_groups = [var.security_group_id]
  }

  load_balancer {
    target_group_arn = var.target_group_arn
    container_name   = "threat-app-1"
    container_port   = 3000
  }

  deployment_controller {
    type = "ECS"
  }


depends_on = [var.http_listener_arn, var.https_listener_arn]


}
