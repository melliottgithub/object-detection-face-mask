import RootReducer, { RootState } from "../slices";
import { thunk, ThunkAction } from "redux-thunk";
import {configureStore, applyMiddleware, Action, Tuple} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";

const thunkEnhancer = applyMiddleware(thunk);

const Store = configureStore({
    reducer: RootReducer,
    enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(new Tuple(thunkEnhancer)),
});

export type AppThunk = ThunkAction<void, RootState, null, Action>;
export type AppDispatch = typeof Store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export default Store;