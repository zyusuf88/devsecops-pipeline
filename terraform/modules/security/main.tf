resource "aws_security_group" "this" {
  vpc_id = var.vpc_id

  name        = "${var.project_name}-sg"
  description = "Security group for application"


  ingress {
    description = "http access"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = var.allowed_cidr_blocks


  }

  ingress {
     description = "allow inbound traffic"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = var.allowed_cidr_blocks
  }

  ingress {
    description = "allow container access"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = var.allowed_cidr_blocks
  }

  egress {
    description = " outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
   cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-sg"
  }
}
