#!/bin/bash

[ -z "$STAGE" ] && echo "STAGE not set" && exit 1;
[ -z "$MONGODB_APP_PASSWORD" ] && echo "MONGODB_APP_PASSWORD not set" && exit 1;

terraform init
terraform validate
terraform workspace select $STAGE || terraform workspace new $STAGE
terraform apply -var="mongodb_app_password=$MONGODB_APP_PASSWORD" -auto-approve
