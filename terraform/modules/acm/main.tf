data "aws_acm_certificate" "existing" {
  domain   = "${var.record_name}.${var.domain_name}"
  statuses = ["ISSUED"]

}
