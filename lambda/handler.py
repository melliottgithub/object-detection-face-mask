import json
import os
import boto3
import base64
from io import BytesIO


def lambda_handler(event, _):
    # Initialize AWS Rekognition client
    rekognition_client = boto3.client("rekognition")
    
    # read environment variables
    REKOG_INFERENCE_ARN = os.environ['REKOG_INFERENCE_ARN']

    # Extract base64 image from the event
    payload = json.loads(event["body"])
    base64_image = payload["base64_image"]

    # Decode the base64 image and create a bytes buffer
    image_binary = BytesIO(base64.b64decode(base64_image))

    # Call AWS Rekognition to detect objects in the image
    try:
        response = rekognition_client.detect_custom_labels(
            ProjectVersionArn=REKOG_INFERENCE_ARN,
            Image={
                "Bytes": image_binary.getvalue()
            },
            MaxResults=10,
            MinConfidence=65.0
        )
    except rekognition_client.exceptions.ResourceNotReadyException as e:
        error_message = 'There is no inference unit running for the custom label project (ResourceNotReadyException).'
        print(error_message)
        return {'ErrorMessage': error_message,'CustomLabels':[]}

    return response
