import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { deleteBranchById, getAll } from '@/api/services/branch';
import { IBranch, IBranchSlice } from '@/interfaces/branchInterfaces';

const handleAsyncThunkError = (error: Error) => {
  throw error;
};

export const fetchBranches = createAsyncThunk('branches/getAll', async () => {
  try {
    const response = await getAll();
    return response as unknown as IBranch[];
  } catch (error) {
    return (error as AxiosError).response?.status === 404
      ? []
      : handleAsyncThunkError(error as Error);
  }
});

export const deleteBranch = createAsyncThunk(
  'branches/delete',
  async (id: string) => {
    try {
      await deleteBranchById(id);
      return id;
    } catch (error) {
      return (error as AxiosError).response?.status === 404
        ? []
        : handleAsyncThunkError(error as Error);
    }
  }
);

const initialState: IBranchSlice = {
  status: 'idle',
  branches: [],
  error: null,
};

export const BranchSlice = createSlice({
  name: 'branches',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBranches.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchBranches.fulfilled,
        (state, { payload }: PayloadAction<Array<IBranch>>) => {
          state.status = 'succeeded';
          state.branches = payload;
        }
      )
      .addCase(fetchBranches.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'unknown error';
      })
      .addCase(deleteBranch.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.branches = state.branches.filter(
          (branch) => branch.id !== payload
        );
      });
  },
});

export const BranchReducer = BranchSlice.reducer;
