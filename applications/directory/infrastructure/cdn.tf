resource "aws_cloudfront_distribution" "directory" {
  enabled     = true
  aliases     = [var.directory_app_domain]
  price_class = "PriceClass_All"

  origin {
    domain_name = data.terraform_remote_state.artistdirectory_infrastructure.outputs.assets_bucket_regional_domain_name
    origin_id   = "assets"
    origin_path = "/directory"

    s3_origin_config {
      origin_access_identity = data.terraform_remote_state.artistdirectory_infrastructure.outputs.assets_cloudfront_access_identity_path
    }
  }

  origin {
    domain_name = data.terraform_remote_state.artistdirectory_infrastructure.outputs.domain
    origin_id   = "app"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  ordered_cache_behavior {
    path_pattern             = "_next/*"
    allowed_methods          = ["GET", "HEAD"]
    cached_methods           = ["GET", "HEAD"]
    target_origin_id         = "assets"
    min_ttl                  = 0
    default_ttl              = 86400
    max_ttl                  = 31536000
    compress                 = true
    viewer_protocol_policy   = "redirect-to-https"
    origin_request_policy_id = data.terraform_remote_state.artistdirectory_infrastructure.outputs.assets_cloudfront_origin_request_policy_id
    cache_policy_id          = data.terraform_remote_state.artistdirectory_infrastructure.outputs.assets_cloudfront_cache_policy_id
  }

  ordered_cache_behavior {
    path_pattern             = "images/*"
    allowed_methods          = ["GET", "HEAD"]
    cached_methods           = ["GET", "HEAD"]
    target_origin_id         = "assets"
    min_ttl                  = 0
    default_ttl              = 86400
    max_ttl                  = 31536000
    compress                 = true
    viewer_protocol_policy   = "redirect-to-https"
    origin_request_policy_id = data.terraform_remote_state.artistdirectory_infrastructure.outputs.assets_cloudfront_origin_request_policy_id
    cache_policy_id          = data.terraform_remote_state.artistdirectory_infrastructure.outputs.assets_cloudfront_cache_policy_id
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD", "OPTIONS"]
    target_origin_id       = "app"
    min_ttl                = 0
    default_ttl            = 0
    max_ttl                = 0
    compress               = true
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = true

      cookies {
        forward = "all"
      }
    }
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
    acm_certificate_arn      = data.terraform_remote_state.artistdirectory_infrastructure.outputs.certificate_arn
    minimum_protocol_version = "TLSv1.2_2018"
    ssl_support_method       = "sni-only"
  }
}

resource "aws_route53_record" "directory" {
  zone_id = data.terraform_remote_state.artistdirectory_infrastructure.outputs.hosted_zone_id
  name    = var.directory_app_domain
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.directory.domain_name
    zone_id                = aws_cloudfront_distribution.directory.hosted_zone_id
    evaluate_target_health = false
  }
}
