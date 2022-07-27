resource "aws_sqs_queue" "email_sending_dlq" {
  name                      = "email-sending-dlq-${terraform.workspace}"
  message_retention_seconds = 259200 # 3 days
}

resource "aws_sqs_queue" "email_sending" {
  name                       = "email-sending-queue-${terraform.workspace}"
  visibility_timeout_seconds = 60
  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.email_sending_dlq.arn
    maxReceiveCount     = 10
  })
}

resource "aws_sqs_queue_policy" "email_sending_policy" {
  queue_url = aws_sqs_queue.email_sending.id
  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Principal" : "*",
        "Action" : "sqs:SendMessage",
        "Resource" : "${aws_sqs_queue.email_sending.arn}"
      }
    ]
  })
}

resource "aws_ssm_parameter" "email_sending_queue_arn" {
  name      = "/artistdirectory/${terraform.workspace}/queues/email-sending/arn"
  type      = "String"
  value     = aws_sqs_queue.email_sending.arn
  overwrite = true
}

resource "aws_ssm_parameter" "email_sending_queue_url" {
  name      = "/artistdirectory/${terraform.workspace}/queues/email-sending/url"
  type      = "String"
  value     = aws_sqs_queue.email_sending.id
  overwrite = true
}
