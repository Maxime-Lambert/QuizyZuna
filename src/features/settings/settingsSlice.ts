import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface SettingsState {
    amount: number;
    timer: number;
    themes: string[];
    difficulties: string[];
}

const initialState: SettingsState = {
    amount: 10,
    timer: 20,
    themes: [],
    difficulties: []
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        changeThemes: (state, action) => {
          state.themes = action.payload;
        },
        changeDifficulties: (state, action) => {
          state.difficulties = action.payload;
        },
        changeAmount: (state, action) => {
          state.amount = action.payload;
        },
        changeTimer: (state, action) => {
          state.timer = action.payload;
        },
        resetSettings: (state) => {
          state.amount = 10;
          state.timer = 20;
          state.themes = [];
          state.difficulties = [];
        }
    }
});

export const { changeThemes, changeDifficulties, changeAmount, changeTimer, resetSettings } = settingsSlice.actions;

export const selectThemes = (state: RootState) => state.settings.themes;
export const selectDifficulties = (state: RootState) => state.settings.difficulties;
export const selectAmount = (state: RootState) => state.settings.amount;
export const selectTimer = (state: RootState) => state.settings.timer;

export default settingsSlice.reducer;
