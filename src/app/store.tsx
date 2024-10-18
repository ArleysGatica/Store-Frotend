import { configureStore } from '@reduxjs/toolkit';
import { BranchReducer } from './slices/branchSlice';
import { TablaBranchReducer } from './slices/tablaBranchSlice';

export const store = configureStore({
  reducer: {
    branches: BranchReducer,
    tablaBranches: TablaBranchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
