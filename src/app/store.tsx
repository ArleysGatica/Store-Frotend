import { configureStore } from '@reduxjs/toolkit';
import { BranchReducer } from './slices/branchSlice';
import { loginReducer } from './slices/login';
import { TablaBranchReducer } from './slices/tablaBranchsSlice';

export const store = configureStore({
  reducer: {
    branches: BranchReducer,
    auth: loginReducer,
    inventory: TablaBranchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
