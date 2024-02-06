import { createAsyncThunk } from "@reduxjs/toolkit";

import PhotoRepo, { PhotoAnalysisResult, PhotoEntity } from "../../service/photo-repo.ts";
import { EntityParams } from "../../service/repository.ts";
import { analyzeBase64Image } from "../../service/lambda.ts";

export type AddPhotoParams = EntityParams<PhotoEntity>

export const addPhoto = createAsyncThunk<PhotoEntity, AddPhotoParams>(
    "Photo/AddPhoto",
    async (photoParams) => PhotoRepo.singleton.save(photoParams)
);

export const fetchPhotos = createAsyncThunk<PhotoEntity[]>(
    "Photo/FetchAllPhotos",
    async () => PhotoRepo.singleton.getAll()
);

export const fetchPhoto = createAsyncThunk<PhotoEntity, string>(
    "Photo/FetchPhoto",
    async (id: string) => PhotoRepo.singleton.getById(id)
);

export const deletePhoto = createAsyncThunk<string, string>(
    "Photos/DeletePhoto",
    async (id: string) => {
        await PhotoRepo.singleton.delete(id);
        return id;
    }
);

export const analyzePhoto = createAsyncThunk<PhotoEntity, PhotoEntity>(
    "Photo/AnalyzePhoto",
    async (photo: PhotoEntity, { rejectWithValue }) => {
        try {
            // Ideally, this should be on a service level backend but since we only have a client-side repository defined, I'll do it here.
            const detectedObjects = await analyzeBase64Image(photo);
            const results = detectedObjects
                .reduce<PhotoAnalysisResult[]>((arr, current) => {
                    const newArr = Array.from(arr);
                    if (current.Geometry) {
                        newArr.push({
                            class: current.Name,
                            confidence: current.Confidence,
                            boundingBox: [
                                current.Geometry.BoundingBox.Left,
                                current.Geometry.BoundingBox.Top,
                                current.Geometry.BoundingBox.Width,
                                current.Geometry.BoundingBox.Height
                            ]
                        })
                    }
                    return newArr;
                    //} else return arr;
                }, [])
                .sort((a, b) => b.confidence - a.confidence)
            const updatedPhoto = { ...photo, results };
            await PhotoRepo.singleton.update(updatedPhoto);
            return updatedPhoto;
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)