import {GenericState, RootState} from "./index.ts";
import {State} from "./state.ts";
import {createEntityAdapter, createSlice, isAnyOf} from "@reduxjs/toolkit";
import {PhotoEntity} from "../../service/photo-repo.ts";
import {addPhoto, analyzePhoto, deletePhoto, fetchPhoto, fetchPhotos} from "../actions/photo.ts";

export const PhotoAdapter = createEntityAdapter<PhotoEntity, string>({
    selectId: model => model.id
});

export const PhotoInitialState = PhotoAdapter.getInitialState<GenericState>({
    status: State.INITIALIZED,
});

export const PhotoSlice = createSlice({
    name: "Photo",
    initialState: PhotoInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addPhoto.fulfilled, (state, { payload }) => {
                PhotoAdapter.addOne(state, payload);
                state.status = State.FINISHED;
            })
            .addCase(fetchPhotos.fulfilled, (state, { payload }) => {
                PhotoAdapter.addMany(state, payload);
                state.status = State.FINISHED;
            })
            .addCase(fetchPhoto.fulfilled, (state, { payload }) => {
                PhotoAdapter.addOne(state, payload);
                state.selectedEntity = payload.id;
                state.status = State.FINISHED;
            })
            .addCase(deletePhoto.fulfilled, (state, { payload }) => {
                PhotoAdapter.removeOne(state, payload);
                state.status = State.FINISHED;
            })
            .addCase(analyzePhoto.fulfilled, (state, { payload }) => {
                PhotoAdapter.updateOne(state, { id: payload.id, changes: payload });
                state.status = State.FINISHED;
            })
            .addMatcher(
                isAnyOf(
                    addPhoto.pending,
                    fetchPhotos.pending,
                    fetchPhoto.pending,
                    deletePhoto.pending,
                    analyzePhoto.pending,
                ),
                (state) => {
                    state.status = State.LOADING;
                    state.error = undefined;
                }
            )
            .addMatcher(
                isAnyOf(
                    addPhoto.rejected,
                    fetchPhotos.rejected,
                    fetchPhoto.rejected,
                    deletePhoto.rejected,
                    analyzePhoto.rejected,
                ),
                (state, { payload }) => {
                    state.status = State.ERROR;
                    if (payload) state.error = payload as string;
                }
            );
    },
});

export const { selectById, selectAll } =
    PhotoAdapter.getSelectors<RootState>((state) => state.Photo);