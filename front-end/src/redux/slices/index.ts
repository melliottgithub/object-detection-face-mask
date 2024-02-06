import { State } from "./state.ts";
import {PhotoSlice} from "./photo.ts";
import {combineReducers} from "@reduxjs/toolkit";

export interface GenericState {
    error?: string;
    status: State;
    selectedEntity?: string;
}

const RootReducer = combineReducers({
    Photo: PhotoSlice.reducer
});

export type RootState = ReturnType<typeof RootReducer>;
export default RootReducer;