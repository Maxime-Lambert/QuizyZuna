import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from '../features/settings/settingsSlice';
import questionReducer from '../features/question/questionSlice';
import appReducer from '../appSlice';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    question: questionReducer,
    app: appReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
