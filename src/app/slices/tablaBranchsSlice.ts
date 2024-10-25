import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { inventoryGetAll } from '../../api/services/tablaBranchs';
import {
  ITablaBranch,
  ITablaBranchSlice,
} from '../../interfaces/branchInterfaces';
const handleAsyncThunkError = (error: Error) => {
  throw error;
};
export const fetchTablaBranches = createAsyncThunk(
  'tablaBranches/getAll',
  async () => {
    try {
      const response = await inventoryGetAll();
      return response as unknown as ITablaBranch[];
    } catch (error) {
      return (error as AxiosError).response?.status === 404
        ? []
        : handleAsyncThunkError(error as Error);
    }
  }
);
const initialState: ITablaBranchSlice = {
  status: 'idle',
  tablaBranches: [],
  error: null,
};
export const TablaBranchSlice = createSlice({
  name: 'tablaBranches',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTablaBranches.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchTablaBranches.fulfilled,
        (state, { payload }: PayloadAction<Array<ITablaBranch>>) => {
          state.status = 'succeeded';
          state.tablaBranches = payload;
        }
      )
      .addCase(fetchTablaBranches.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'unknown error';
      });
  },
});
export const TablaBranchReducer = TablaBranchSlice.reducer;
