#!/bin/bash

[ -z "$STAGE" ] && echo "STAGE not set" && exit 1;

terraform init
terraform validate
terraform workspace select $STAGE || terraform workspace new $STAGE
terraform apply -var="jwt_secret=$JWT_SECRET" -var-file=./config/$STAGE.tfvars -auto-approve
