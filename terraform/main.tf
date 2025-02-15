module "vpc" {
  source = "./modules/vpc"

  project_name   = var.project_name
  vpc_cidr       = var.vpc_cidr
  public_subnet_1 = var.public_subnet_1
  public_subnet_2 = var.public_subnet_2
  az_1           = var.az_1
  az_2           = var.az_2
}


module "security" {
  source = "./modules/security"

  project_name       = var.project_name
  vpc_id            = module.vpc.vpc_id  
  allowed_cidr_blocks = var.allowed_cidr_blocks
}


module "alb" {
  source            = "./modules/alb"
  vpc_id            = module.vpc.vpc_id
  public_subnet_ids = module.vpc.public_subnets
  security_group_id = module.security.security_group_id 
  certificate_arn   = module.acm.certificate_arn
  project_name          = var.project_name  

}


module "ecs" {
  source                = "./modules/ecs"
  project_name          = var.project_name
  vpc_id                = module.vpc.vpc_id
  subnet_ids            = module.vpc.public_subnets
 security_group_id     = module.security.security_group_id
  alb_dns_name          = module.alb.alb_dns_name  
  http_listener_arn      = module.alb.http_listener_arn
  https_listener_arn     = module.alb.https_listener_arn
  target_group_arn      = module.alb.target_group_arn 
  certificate_arn       = module.acm.certificate_arn
  domain_name           = var.domain_name
  alb_listener = module.alb.https_listener
  task_role_arn      = var.task_role_arn
  execution_role_arn = var.execution_role_arn
}


module "route53" {
  source          = "./modules/route53"
  domain_name = var.domain_name
  record_name     = var.record_name
  alb_dns_name    = module.alb.alb_dns_name
  alb_zone_id     = module.alb.alb_zone_id
  certificate_arn = module.acm.certificate_arn
}


module "acm" {
  source      = "./modules/acm"
  domain_name = var.domain_name
   record_name     = var.record_name

}

module "iam" {
  source = "./modules/iam"
  project_name = var.project_name
}









