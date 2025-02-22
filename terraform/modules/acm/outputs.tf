output "certificate_arn" {
  value = data.aws_acm_certificate.existing.arn
}
