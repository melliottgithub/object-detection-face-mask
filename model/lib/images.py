from PIL import Image
import os

def list_images(directory):
    image_list = []
    for filename in os.listdir(directory):
        if filename.endswith(".jpg") or filename.endswith(".png"):  # Handle common image formats
            image_list.append(directory +'/'+ filename)
    return image_list

def read_image_file(filename):
    return Image.open(filename)

def rotate_image_portrait(img):
    if img.width > img.height:
        return img.rotate(90, expand=True) 
    return img

def scale_image(image, target_width=320):
    width, height = image.size
    aspect_ratio = height / width
    new_height = int(aspect_ratio * target_width)

    # Resize the image while maintaining aspect ratio
    return image.resize((target_width, new_height))

def crop_center(image, target_height):
    # Get the current size of the image
    current_width, current_height = image.size

    # Calculate the top and bottom coordinates for cropping
    top = (current_height - target_height) // 2
    bottom = top + target_height

    # Crop the image
    cropped_image = image.crop((0, top, current_width, bottom))

    return cropped_image

def get_image_properties(img):
    width, height = img.size

    return {
        'width': width,
        'height': height,
        'mode': img.mode
    }

def convert_to_rgb(img):
    # Convert to RGB if not already in that mode
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    return img
