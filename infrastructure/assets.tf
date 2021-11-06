resource "aws_s3_bucket" "assets" {
  bucket        = var.assets_domain
  acl           = "private"
  force_destroy = false

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "HEAD"]
    allowed_origins = ["*"]
    max_age_seconds = 86400
  }
}

resource "aws_cloudfront_origin_access_identity" "assets" {}

data "aws_iam_policy_document" "assets" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.assets.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.assets.iam_arn]
    }
  }
}

resource "aws_s3_bucket_policy" "assets" {
  bucket = aws_s3_bucket.assets.id
  policy = data.aws_iam_policy_document.assets.json
}

data "aws_cloudfront_origin_request_policy" "assets" {
  name = "Managed-CORS-S3Origin"
}

data "aws_cloudfront_cache_policy" "assets" {
  name = "Managed-CachingOptimized"
}

resource "aws_cloudfront_distribution" "assets" {
  enabled     = true
  aliases     = [var.assets_domain]
  price_class = "PriceClass_All"

  origin {
    domain_name = aws_s3_bucket.assets.bucket_regional_domain_name
    origin_id   = "assets"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.assets.cloudfront_access_identity_path
    }
  }

  default_cache_behavior {
    allowed_methods          = ["GET", "HEAD", "OPTIONS"]
    cached_methods           = ["GET", "HEAD"]
    target_origin_id         = "assets"
    min_ttl                  = 0
    default_ttl              = 2628000
    max_ttl                  = 31536000
    compress                 = true
    viewer_protocol_policy   = "redirect-to-https"
    origin_request_policy_id = data.aws_cloudfront_origin_request_policy.assets.id
    cache_policy_id          = data.aws_cloudfront_cache_policy.assets.id
  }

  custom_error_response {
    error_code            = 400
    error_caching_min_ttl = 5
  }

  custom_error_response {
    error_code            = 403
    error_caching_min_ttl = 5
  }

  custom_error_response {
    error_code            = 404
    error_caching_min_ttl = 5
  }

  custom_error_response {
    error_code            = 500
    error_caching_min_ttl = 0
  }

  custom_error_response {
    error_code            = 501
    error_caching_min_ttl = 0
  }

  custom_error_response {
    error_code            = 502
    error_caching_min_ttl = 0
  }

  custom_error_response {
    error_code            = 503
    error_caching_min_ttl = 0
  }

  custom_error_response {
    error_code            = 504
    error_caching_min_ttl = 0
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
      locations        = []
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.domain.arn
    minimum_protocol_version = "TLSv1.2_2018"
    ssl_support_method       = "sni-only"
  }
}

resource "aws_route53_record" "assets" {
  zone_id = var.hosted_zone_id
  name    = var.assets_domain
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.assets.domain_name
    zone_id                = aws_cloudfront_distribution.assets.hosted_zone_id
    evaluate_target_health = false
  }
}

output "assets_bucket_regional_domain_name" {
  value = aws_s3_bucket.assets.bucket_regional_domain_name
}

output "assets_cloudfront_access_identity_path" {
  value = aws_cloudfront_origin_access_identity.assets.cloudfront_access_identity_path
}

output "assets_cloudfront_origin_request_policy_id" {
  value = data.aws_cloudfront_origin_request_policy.assets.id
}

output "assets_cloudfront_cache_policy_id" {
  value = data.aws_cloudfront_cache_policy.assets.id
}
