import { configureStore } from '@reduxjs/toolkit';

import { loginReducer } from './slices/login';
import { branchesReducer } from './slices/branchSlice';
import { productsReducer } from './slices/productsSlice';
import { groupsReducer } from './slices/groups';
import { transferReducer } from './slices/transferSlice';

export const store = configureStore({
  reducer: {
    branches: branchesReducer,
    auth: loginReducer,
    products: productsReducer,
    categories: groupsReducer,
    transfer: transferReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
