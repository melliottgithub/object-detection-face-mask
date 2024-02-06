from PIL import Image, ImageEnhance, ImageFilter
import random

def rotations(img, angles):
    augments = []
    for angle in angles:
        aug = img.rotate(angle)
        augments.append((str(angle), aug))
    return augments

def transpose(img):
    augments = []
    # Flip horizontally
    aug = img.transpose(Image.FLIP_LEFT_RIGHT)
    augments.append(('th', aug))
    
    # Flip horizontally and rotate 90
    aug = aug.rotate(90)
    augments.append(('thr', aug))
    
    # Flip vertically
    aug = img.transpose(Image.FLIP_TOP_BOTTOM)
    augments.append(('tv', aug))
        
    return augments

def enhancements(img, factors=(0.5, 0.5, 0.5, 0.5)):
    augments = []
    
    # Brightness
    aug = ImageEnhance.Brightness(img).enhance(factors[0])
    augments.append(('b', aug))
    
    # Contrast
    aug = ImageEnhance.Contrast(img).enhance(factors[1])
    augments.append(('c', aug))
    
    # Sharpness
    aug = ImageEnhance.Sharpness(img).enhance(factors[2])
    augments.append(('s', aug))
    
    # Color
    aug = ImageEnhance.Color(img).enhance(factors[3])
    augments.append(('cl', aug))
    
    return augments

def blur(img, radius=4):
    augments = []

    # gaussian blur
    aug = img.filter(ImageFilter.GaussianBlur(radius=radius))
    augments.append(('gb', aug))
    
    return augments

def rgb_shift(image, offset=10):
    # Split the image into its R, G, B components
    r, g, b = image.split()

    # Define offsets for each of the channels
    r_offset = (offset, 0)
    g_offset = (0, 0)  # no offset for green channel
    b_offset = (0, offset)

    # Offset each channel
    r = r.transform(image.size, Image.AFFINE, (1, 0, r_offset[0], 0, 1, r_offset[1]))
    b = b.transform(image.size, Image.AFFINE, (1, 0, b_offset[0], 0, 1, b_offset[1]))

    # Merge the channels back together
    result_image = Image.merge("RGB", (r, g, b))

    return [('cs', result_image)]

def channel_shuffle(image):
    channels = list(image.split())
    orig_channels = channels.copy()
    random.shuffle(channels)
    
    if channels != orig_channels:
        result_image = Image.merge("RGB", channels)
        return [('ch', result_image)]
    else:
        return []