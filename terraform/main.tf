
module "threat-app" {
  source                     = "./module/app"
  threat_app_container_image = var.threat_app_container_image
  cloudflare_zone_id         = var.cloudflare_zone_id
  cloudflare_api_token       = var.cloudflare_api_token
}



