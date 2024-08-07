import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./app/store";

export interface AppState {
  volume: number;
}

const initialState: AppState = {
  volume: 0.5,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        changeVolume: (state, action) => {
          state.volume = action.payload;
        }
    }
});

export const { changeVolume } = appSlice.actions;

export const selectVolume = (state: RootState) => state.app.volume;

export default appSlice.reducer;
