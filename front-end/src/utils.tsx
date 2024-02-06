import {ImageDimensions} from "./service/photo-repo.ts";

export const toBase64 = (file: Blob): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export const getImageDimensions = (image: string): Promise<ImageDimensions> => {
    return new Promise((resolve) =>{
        const img = new Image();
        img.src = image;
        img.onload = () => resolve({width: img.width, height: img.height})
    })
};

const ColorArray: string[] = ["#4f46e5", "#c026d3", "#e11d48", "#16a34a", "#ea580c"];

export const getColor = (index: number): string => {
    return ColorArray[index % ColorArray.length];
}