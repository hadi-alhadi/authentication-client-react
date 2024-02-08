import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

export interface GeneralSliceState {
    isLoading: boolean;
}

const initialState: GeneralSliceState = {
    isLoading: false,
}

export const generalSlice = createSlice({
    name: 'generalSlice',
    initialState,
    reducers: {
        setShowLoader(state: GeneralSliceState, { payload }: PayloadAction<boolean>) {
            state.isLoading = payload
        },
    }
})

export const { setShowLoader } = generalSlice.actions;
export const generalReducer = generalSlice.reducer;
export const selectGeneral = (state: RootState) => state.generalReducer
