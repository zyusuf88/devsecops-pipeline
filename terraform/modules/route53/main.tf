
data "aws_route53_zone" "this" {
  name = var.domain_name
}

resource "aws_route53_record" "this" {
  zone_id = data.aws_route53_zone.this.id
  name    = "${var.record_name}.${var.domain_name}"
  type    = "CNAME"
  ttl     = 300
  records = [var.alb_dns_name]
}

