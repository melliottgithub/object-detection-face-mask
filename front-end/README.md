# Web Application for Face Mask Detection

## S3 Bucket Configuration for Hosting

### Create S3 Bucket for SPA Hosting

```bash
AWS_PROFILE=<profile>
BUCKET_NAME=face-mask-webapp
aws s3api create-bucket --profile $AWS_PROFILE \
--bucket $BUCKET_NAME --region us-east-1
```

### Enable S3 bucket website hosting

```bash
aws s3 website --profile $AWS_PROFILE s3://$BUCKET_NAME --index-document index.html
```

### Enable public access

```bash
aws s3api --profile $AWS_PROFILE put-public-access-block --bucket $BUCKET_NAME --public-access-block-configuration BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false

```

### Permission policy

```bash
aws s3api --profile $AWS_PROFILE put-bucket-policy --bucket $BUCKET_NAME \
--policy '{
    "Version": "2012-10-17",
    "Id": "PublicReadGetObject",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::face-mask-webapp/*"
        }
    ]
}'

```

## Environment Variables

In order to run or deploy the web application, you need to set the following environment variables:

`.env` file:
```bash
VITE_LAMBDA_ENDPOINT=<API Gateway URL>
```

## Build and Deploy

### Build the web application

```bash
npm install
npm run build
```

### Deploy the web application to S3

```bash
aws s3 sync --profile $AWS_PROFILE ./dist/ s3://$BUCKET_NAME --delete
```