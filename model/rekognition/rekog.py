import time
from datetime import datetime
import json

from botocore.exceptions import ClientError

def find_project(rek_client, project_arn):
    response = rek_client.describe_projects(MaxResults=100, Features=['CUSTOM_LABELS']) # up to 100 projects
    projects = response['ProjectDescriptions']
    for project in projects:
        if project['ProjectArn'] == project_arn:
            return project
        
def find_project_version(rek_client, project_arn, version_name):
    response = rek_client.describe_project_versions(
        ProjectArn=project_arn,
        VersionNames=[version_name],
        MaxResults=5 # up to 5 versions
    )

    versions = response['ProjectVersionDescriptions']
    for version in versions:
        return version

def delete_datasets(rek_client, project):
    """
    Deletes an Amazon Rekognition Custom Labels dataset.
    :param rek_client: The Amazon Rekognition Custom Labels Boto3 client.
    :param project: The project that contains the datasets that you want to delete.
    """
    try:
        if project['Status'] != 'CREATED':
            raise Exception(f"Project {project['ProjectArn']} is {project['Status']}")
        
        # check if train dataset exists
        train_dataset = [dataset for dataset in project['Datasets'] if dataset['DatasetType'] == 'TRAIN']
        if len(train_dataset) == 1:
            if train_dataset[0]['Status'] == 'CREATE_COMPLETE':
                dataset_arn = train_dataset[0]['DatasetArn']
                rek_client.delete_dataset(DatasetArn=train_dataset[0]['DatasetArn'])
                print(f"Deleted dataset {dataset_arn}")
            
        # check if test dataset exists
        test_dataset = [dataset for dataset in project['Datasets'] if dataset['DatasetType'] == 'TEST']
        if len(test_dataset) == 1:
            if test_dataset[0]['Status'] == 'CREATE_COMPLETE':
                dataset_arn = test_dataset[0]['DatasetArn']
                rek_client.delete_dataset(DatasetArn=test_dataset[0]['DatasetArn'])
                print(f"Deleted dataset {dataset_arn}")
        
    except ClientError as err:  
        print(f"Couldn't delete dataset: {err.response['Error']['Message']}")
        raise

def create_image_label(job_name, image_src, class_name):
    creation_date = datetime.now().isoformat()
    label_attribute = job_name
    
    image_label = {
        "source-ref": image_src,
        f"{label_attribute}": 1,
        f"{label_attribute}-metadata": {
            "confidence": 1,
            "job-name": f"labeling-job/{job_name}",
            "class-name": class_name,
            "human-annotated": "yes",
            "creation-date": creation_date,
            "type": "groundtruth/image-classification"
        }
    }
        
    # convert image_label to JSON string
    return json.dumps(image_label)

def pascal_voc_to_object_bb(annotation, class_map):
    bbs = []
    for obj in annotation.objects:
        class_id = list(class_map.values()).index(obj.name)
        bbs.append({
            'class_id': class_id,
            'top': obj.bndbox.ymin,
            'left': obj.bndbox.xmin,
            'width': obj.bndbox.xmax - obj.bndbox.xmin,
            'height': obj.bndbox.ymax - obj.bndbox.ymin
        })
    return bbs

def pascal_voc_to_manifest_line(job_name, annotation, class_map, image_src):
    creation_date = datetime.now().isoformat()

    bb_annotations = pascal_voc_to_object_bb(annotation, class_map)

    meta_class_map = {}
    for bb in bb_annotations:
        class_id = bb['class_id']
        meta_class_map[class_id] = class_map[str(class_id)]
        
    manifest_line = {
        "source-ref": image_src,
        "bounding-box": {
            "image_size": [
            {
                "width": 720,
                "height": 720,
                "depth": 3
            }
            ],
            "annotations": bb_annotations
        },
        "bounding-box-metadata": {
            "objects": [{"confidence": 1} for _ in bb_annotations],
            "class-map": meta_class_map,
            "type": "groundtruth/object-detection",
            "human-annotated": "yes",
            "creation-date": creation_date,
            "job-name": job_name
        }
    }

    return json.dumps(manifest_line)


def train_new_model(rekognition_client, project_arn, output_s3_bucket,
                    training_manifest_s3_uri, testing_manifest_s3_uri):
    # extract bucket name
    training_manifest_bucket = training_manifest_s3_uri.split('/')[2]
    training_manifest_key = training_manifest_s3_uri.split('/', 3)[3]
    testing_manifest_bucket = testing_manifest_s3_uri.split('/')[2]
    testing_manifest_key = testing_manifest_s3_uri.split('/', 3)[3]
    
    version_name = f"version.{datetime.now().strftime('%Y-%m-%dT%H%M%S')}"
    response = rekognition_client.create_project_version(
        ProjectArn=project_arn,
        VersionName=version_name,
        OutputConfig={
            'S3Bucket': output_s3_bucket,
            'S3KeyPrefix': f'{version_name}/'
        },
        TrainingData={
            'Assets': [
                {
                    'GroundTruthManifest': {
                        'S3Object': {
                            'Bucket': training_manifest_bucket,
                            'Name': training_manifest_key
                        }
                    }
                },
            ]
        },
        TestingData={
            'Assets': [
                {
                    'GroundTruthManifest': {
                        'S3Object': {
                            'Bucket': testing_manifest_bucket,
                            'Name': testing_manifest_key
                        }
                    }
                },
            ],
            'AutoCreate': False
        },
    )
    return response['ProjectVersionArn']
    