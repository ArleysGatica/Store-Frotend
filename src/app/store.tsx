import { configureStore } from '@reduxjs/toolkit';
import { BranchReducer } from './slices/branchSlice';
import { loginReducer } from './slices/login';

export const store = configureStore({
  reducer: {
    branches: BranchReducer,
    auth: loginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
