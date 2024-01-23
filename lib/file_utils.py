import os
import pickle

def create_directory(path):
    if not os.path.exists(path):
        os.makedirs(path)
        
def get_subdirectories(directory):
    subdirectories = []
    for root, dirs, files in os.walk(directory):
        for dir in dirs:
            subdirectories.append(dir)
    return subdirectories

def save_to_pickle(file_name, object):
    with open(file_name, 'wb') as f:
        pickle.dump(object, f, protocol=pickle.HIGHEST_PROTOCOL)

def read_from_pickle(file_name):
    with open(file_name, 'rb') as f:
        return pickle.load(f)

def list_images(directory):
    image_list = []
    for filename in os.listdir(directory):
        if filename.endswith(".jpg") or filename.endswith(".png"):  # Handle common image formats
            image_list.append(directory +'/'+ filename)
    return image_list
