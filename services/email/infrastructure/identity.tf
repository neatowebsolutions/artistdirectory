# Reference: https://github.com/onnimonni/terraform-ses-lambda-demo

# Create identity.
resource "aws_ses_domain_identity" "domain" {
  domain = data.terraform_remote_state.artistdirectory_infrastructure.outputs.domain
}

resource "aws_ses_email_identity" "noreply" {
  email = "noreply@${data.terraform_remote_state.artistdirectory_infrastructure.outputs.domain}"
}

# Use custom MAIL FROM.
resource "aws_ses_domain_mail_from" "domain" {
  domain           = data.terraform_remote_state.artistdirectory_infrastructure.outputs.domain
  mail_from_domain = "mail.${data.terraform_remote_state.artistdirectory_infrastructure.outputs.domain}"
  depends_on       = [aws_ses_domain_identity.domain]
}

# Create MX record.
resource "aws_route53_record" "domain_mx" {
  zone_id = data.terraform_remote_state.artistdirectory_infrastructure.outputs.hosted_zone_id
  name    = "mail.${data.terraform_remote_state.artistdirectory_infrastructure.outputs.domain}"
  type    = "MX"
  ttl     = "300"
  records = ["10 feedback-smtp.us-east-1.amazonses.com"]
}

resource "aws_ses_domain_dkim" "domain" {
  domain = aws_ses_domain_identity.domain.domain
}

# Add record which allows our domain as sender from spf.
resource "aws_route53_record" "domain_dkim_record" {
  count   = 3
  zone_id = data.terraform_remote_state.artistdirectory_infrastructure.outputs.hosted_zone_id
  name    = "${element(aws_ses_domain_dkim.domain.dkim_tokens, count.index)}._domainkey.${data.terraform_remote_state.artistdirectory_infrastructure.outputs.domain}"
  type    = "CNAME"
  ttl     = "300"
  records = ["${element(aws_ses_domain_dkim.domain.dkim_tokens, count.index)}.dkim.amazonses.com"]
}
