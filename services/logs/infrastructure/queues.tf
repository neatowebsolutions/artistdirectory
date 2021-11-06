resource "aws_sqs_queue" "log" {
  name     = "log-queue-${terraform.workspace}"
  provider = aws.region
}

resource "aws_sqs_queue_policy" "log_policy" {
  queue_url = aws_sqs_queue.log.id
  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Principal" : "*",
        "Action" : "sqs:SendMessage",
        "Resource" : "${aws_sqs_queue.log.arn}"
      }
    ]
  })
  provider = aws.region
}

resource "aws_ssm_parameter" "log_queue_arn" {
  name      = "/artistdirectory/${terraform.workspace}/queues/log/arn"
  type      = "String"
  value     = aws_sqs_queue.log.arn
  overwrite = true
  provider  = aws.region
}

resource "aws_ssm_parameter" "log_queue_url" {
  name      = "/artistdirectory/${terraform.workspace}/queues/log/url"
  type      = "String"
  value     = aws_sqs_queue.log.id
  overwrite = true
  provider  = aws.region
}
