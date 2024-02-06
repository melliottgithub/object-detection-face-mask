# Lambda function for Face Mask Inference

## Create Lambda function

Environment variables para following commands.

```bash
AWS_REGION=us-east-1
FUNCTION_NAME=face_mask_inference
```

Create the role for the Lambda access to Rekognitiion custom labels (detect_custom_labels operation)

```bash
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
aws iam create-policy --policy-name RekognitionCustomLabelsAccess --policy-document file://RekognitionCustomLabelsPolicy.json
aws iam create-role --role-name LambdaRekognitionRole --assume-role-policy-document file://TrustPolicyForLambda.json
aws iam attach-role-policy --role-name LambdaRekognitionRole --policy-arn "arn:aws:iam::$AWS_ACCOUNT_ID:policy/RekognitionCustomLabelsAccess"
```

Create the lambda and assign the role to it

```bash
REKOG_INFERENCE_ARN='arn:aws:rekognition:us-east-1:$AWS_ACCOUNT_ID:project/face-mask/version/<version>/<inference-instance-id>'

# zip the lambda function
zip face_mask_inference.zip handler.py

aws lambda create-function --function-name face_mask_inference \
--zip-file fileb://face_mask_inference.zip \
--handler handler.lambda_handler \
--environment 'Variables={REKOG_INFERENCE_ARN=$REKOG_INFERENCE_ARN}' \
--runtime python3.11 \
--role arn:aws:iam::$AWS_ACCOUNT_ID:role/LambdaRekognitionRole
```

Set the environment variables for the lambda function

```bash

aws lambda update-function-configuration --function-name face_mask_inference \
--environment "REKOG_INFERENCE_ARN={REKOG_INFERENCE_ARN=$REKOG_INFERENCE_ARN}"
```

Update function code
    
```bash
aws lambda update-function-code --function-name face_mask_inference --zip-file fileb://face_mask_inference.zip
```

## Enable Function URL option

Create Function URL configuration

```bash
aws lambda create-function-url-config \
--function-name face_mask_inference \
--auth-type NONE \
--cors '{"AllowOrigins":["*"],"AllowMethods":["POST"],"AllowHeaders":["Content-Length","Accept","Date","Content-Type"],"ExposeHeaders":["Content-Length","Content-Type","Date","Referer","X-Amz-Apigw-Id","X-Amzn-Requestid","X-Amzn-Trace-Id"]}'
```

Give permission for public access to Function URL invocation

```bash
aws lambda add-permission \
--function-name face_mask_inference \
--statement-id "face_mask_inference-stmt-public" \
--action lambda:InvokeFunctionUrl \
--principal "*" \
--function-url-auth-type NONE
```