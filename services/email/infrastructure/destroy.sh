#!/bin/bash

[ -z "$STAGE" ] && echo "STAGE not set" && exit 1;

aws s3 sync s3://artistdirectory-infrastructure/serverless/email-service . --region us-east-1

(cd .. && serverless remove --stage $STAGE --region us-east-1) || true

terraform init
terraform workspace select $STAGE
terraform destroy -var-file=./config/$STAGE.tfvars -auto-approve || true
