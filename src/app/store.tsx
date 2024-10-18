import { configureStore } from '@reduxjs/toolkit';
import { BranchReducer } from './slices/branchSlice';

export const store = configureStore({
  reducer: {
    branches: BranchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
