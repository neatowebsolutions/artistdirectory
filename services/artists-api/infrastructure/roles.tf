resource "aws_iam_role" "services_consumer_role" {
  name = "services_consumer_role"
  assume_role_policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Action" : "sts:AssumeRole",
        "Principal" : {
          "Service" : ["lambda.amazonaws.com"]
        },
        "Effect" : "Allow",
        "Sid" : ""
      }
    ]
  })
}

resource "aws_iam_policy" "services_consumer_role_policy" {
  name = "services_consumer_role_policy"
  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Sid" : "VisualEditor0",
        "Effect" : "Allow",
        "Action" : [
          "logs:CreateLogStream",
          "logs:CreateLogGroup",
          "logs:PutLogEvents",
          "sqs:SendMessage",
          "sqs:ReceiveMessage",
          "sqs:DeleteMessage",
          "sqs:GetQueueAttributes"
        ],
        "Resource" : "*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "services_consumer_role_policy" {
  role       = aws_iam_role.services_consumer_role.name
  policy_arn = aws_iam_policy.services_consumer_role_policy.arn
}

resource "aws_ssm_parameter" "services_consumer_role_arn" {
  name      = "/artistdirectory/${terraform.workspace}/roles/services-consumer-arn"
  type      = "String"
  value     = aws_iam_role.services_consumer_role.arn
  overwrite = true
}
