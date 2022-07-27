# Reference: https://github.com/onnimonni/terraform-ses-lambda-demo

provider "archive" {}

data "aws_caller_identity" "current" {}

# Create S3 bucket for storing emails.
resource "aws_s3_bucket" "email" {
  bucket        = var.email_bucket
  acl           = "private"
  force_destroy = false
  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Principal" : {
          "Service" : "ses.amazonaws.com"
        },
        "Action" : "s3:PutObject",
        "Resource" : "arn:aws:s3:::${var.email_bucket}/*",
        "Condition" : {
          "StringEquals" : {
            "aws:Referer" : data.aws_caller_identity.current.account_id
          }
        }
      }
    ]
  })
}

# Create Lambda role.
resource "aws_iam_role" "forward_lambda_role" {
  name = "forward-lambda-role-${terraform.workspace}"
  assume_role_policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Action" : "sts:AssumeRole",
        "Principal" : {
          "Service" : "lambda.amazonaws.com"
        },
        "Effect" : "Allow",
      }
    ]
  })
  depends_on = [aws_route53_record.domain_mx]
}

# Create Lambda policy.
resource "aws_iam_policy" "forward_lambda_policy" {
  name = "forward-lambda-policy-${terraform.workspace}"
  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Action" : [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        "Resource" : "arn:aws:logs:*:*:*"
      },
      {
        "Effect" : "Allow",
        "Action" : "ses:SendRawEmail",
        "Resource" : "*"
      },
      {
        "Effect" : "Allow",
        "Action" : [
          "s3:GetObject",
          "s3:PutObject"
        ],
        "Resource" : "arn:aws:s3:::${var.email_bucket}/*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "forward_lambda_policy" {
  role       = aws_iam_role.forward_lambda_role.name
  policy_arn = aws_iam_policy.forward_lambda_policy.arn
}

# Zip the Lambda function.
data "archive_file" "forward_handler" {
  type        = "zip"
  source_file = "${path.root}/forward.js"
  output_path = "${path.root}/forward.zip"
}

# Create the Lambda function.
resource "aws_lambda_function" "forward" {
  filename         = data.archive_file.forward_handler.output_path
  function_name    = "forward-${terraform.workspace}"
  role             = aws_iam_role.forward_lambda_role.arn
  handler          = "forward.handler"
  runtime          = "nodejs16.x"
  memory_size      = 128
  timeout          = 10
  source_code_hash = data.archive_file.forward_handler.output_base64sha256
  publish          = true

  environment {
    variables = {
      DOMAIN                   = data.terraform_remote_state.artistdirectory_infrastructure.outputs.domain
      EMAIL_BUCKET             = var.email_bucket
      INFO_EMAIL               = var.info_email
      SUPPORT_EMAIL            = var.support_email
      INFO_FORWARDING_EMAIL    = var.info_forwarding_email
      SUPPORT_FORWARDING_EMAIL = var.support_forwarding_email
    }
  }

  lifecycle {
    create_before_destroy = "true"
  }

  depends_on = [aws_iam_role_policy_attachment.forward_lambda_policy]
}

# Create inbound MX record.
resource "aws_route53_record" "inbound_mx" {
  zone_id = data.terraform_remote_state.artistdirectory_infrastructure.outputs.hosted_zone_id
  name    = data.terraform_remote_state.artistdirectory_infrastructure.outputs.domain
  type    = "MX"
  ttl     = "300"
  records = ["10 inbound-smtp.us-east-1.amazonaws.com"]
}

resource "aws_ses_receipt_rule_set" "forward_rules" {
  rule_set_name = "forward-rules-${terraform.workspace}"
}

# Create forwarding rules.
resource "aws_ses_receipt_rule" "forward_rule" {
  name          = "store"
  rule_set_name = "forward-rules-${terraform.workspace}"
  recipients = [
    var.info_email,
    var.support_email,
    data.terraform_remote_state.artistdirectory_infrastructure.outputs.domain
  ]
  enabled      = true
  scan_enabled = true

  s3_action {
    bucket_name       = var.email_bucket
    object_key_prefix = "messages/"
    position          = 1
  }

  lambda_action {
    function_arn    = aws_lambda_function.forward.arn
    invocation_type = "Event"
    position        = 2
  }

  depends_on = [aws_s3_bucket.email, aws_lambda_permission.allow_ses]
}

resource "aws_ses_active_receipt_rule_set" "main" {
  rule_set_name = "forward-rules-${terraform.workspace}"
  depends_on    = [aws_ses_receipt_rule_set.forward_rules]
}

# Allow SES to run the Lambda function.
resource "aws_lambda_permission" "allow_ses" {
  statement_id   = "AllowExecutionFromSES"
  action         = "lambda:InvokeFunction"
  function_name  = aws_lambda_function.forward.function_name
  source_account = data.aws_caller_identity.current.account_id
  principal      = "ses.amazonaws.com"
}
