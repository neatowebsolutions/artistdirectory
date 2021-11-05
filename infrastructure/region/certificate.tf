resource "aws_acm_certificate" "domain" {
  domain_name       = var.base_domain
  validation_method = "DNS"
  subject_alternative_names = [
    "*.${var.base_domain}",
    "*.${data.aws_region.current.name}.${var.base_domain}",
    "*.test.${var.base_domain}",
    "*.${data.aws_region.current.name}.test.${var.base_domain}"
  ]
}

data "aws_route53_zone" "domain" {
  name         = var.base_domain
  private_zone = false
}

resource "aws_route53_record" "domain" {
  for_each = {
    for dvo in aws_acm_certificate.domain.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.domain.zone_id
}

resource "aws_acm_certificate_validation" "domain" {
  certificate_arn         = aws_acm_certificate.domain.arn
  validation_record_fqdns = [for record in aws_route53_record.domain : record.fqdn]
}

output "certificate_arn" {
  value = aws_acm_certificate.domain.arn
}
