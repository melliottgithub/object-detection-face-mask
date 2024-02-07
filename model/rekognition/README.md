## Amazon Rekognition

### Create a new project or identify an existing one

```bash
AWS_PROFILE=<profile>
aws rekognition --profile $AWS_PROFILE describe-projects

aws rekognition --profile $AWS_PROFILE create-project \
--project-name face-mask --feature CUSTOM_LABELS
```

### Create S3 Bucket for Image Source

```bash
AWS_PROFILE=<profile>
BUCKET_NAME=face-mask-dataset
aws s3api create-bucket --profile $AWS_PROFILE \
--bucket $BUCKET_NAME --region us-east-1
```

### Upate S3 Bucket Policy
```bash
aws s3api --profile $AWS_PROFILE put-bucket-policy \
--bucket $BUCKET_NAME --policy file://bucket-policy.json
```

### Environment variables

`.env`
```txt
AWS_PROFILE=<aws-profile>
REKOG_PROJECT_ARN=
REKOG_DATASET_BUCKET=
```
