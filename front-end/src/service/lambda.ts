import Config from "../../config.ts";
import {PhotoEntity} from "./photo-repo.ts";

interface RekognitionGeometry {
    BoundingBox: {
        Left: number;
        Top: number;
        Height: number,
        Width: number
    }
}

interface RekognitionCustomLabel {
    Name: string,
    Confidence: number,
    Geometry: RekognitionGeometry
}

interface RekognitionResponse {
    ErrorMessage: string,
    CustomLabels: RekognitionCustomLabel[],
    ResponseMetadata: object
}

export const analyzeBase64Image = async (photo: PhotoEntity): Promise<RekognitionCustomLabel[]> => {
    try {
        const data = photo.data.split(",")[1];
        const response = await fetch(Config.LAMBDA_ENDPOINT, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                base64_image: data
            }),
        });
        const responseData = await response.json() as RekognitionResponse;
        if (responseData.ErrorMessage) {
            throw new Error(responseData.ErrorMessage);
        }
        return responseData.CustomLabels;
    } catch (error) {
        console.error("Error calling Lambda function:", error);
        throw error;
    }
}