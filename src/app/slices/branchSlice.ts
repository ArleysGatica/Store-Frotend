import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  createBranch,
  deleteBranchById,
  getAll,
  updateBranch,
} from '@/api/services/branch';
import { IBranch, IBranchSlice } from '@/interfaces/branchInterfaces';
import { handleAsyncThunkError } from '../../shared/utils/errorHandlers';

export const createBranchs = createAsyncThunk(
  'branches/create',
  async (branch: IBranch) => {
    try {
      const response = await createBranch(branch);
      return response as unknown as IBranch;
    } catch (error) {
      return (error as AxiosError).response?.status === 404
        ? []
        : handleAsyncThunkError(error as Error);
    }
  }
);

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

export const updateBranchs = createAsyncThunk(
  'branches/update',
  async (payload: { branch: IBranch; id: string }) => {
    try {
      const { branch, id } = payload;
      const response = await updateBranch(branch, id);
      return response as unknown as IBranch;
    } catch (error) {
      handleAsyncThunkError(error as Error);
      throw error;
    }
  }
);

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
  reducers: {
    AddingBranchs: (state, action: PayloadAction<IBranch>) => {
      state.branches.push(action.payload);
    },
    deleteBranchs: (state, action: PayloadAction<string>) => {
      state.branches = state.branches.filter(
        (branch) => branch._id !== action.payload
      );
      console.log(action, 'action');
    },
  },
  extraReducers(builder) {
    builder.addCase(createBranchs.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(createBranchs.fulfilled, (state) => {
      state.status = 'succeeded';
    });
    builder.addCase(createBranchs.rejected, (state, { error }) => {
      if (error.message) state.error = error.message;
      state.status = 'failed';
    });
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
          (branch) => branch._id !== payload
        );
      })
      .addCase(
        updateBranchs.fulfilled,
        (state, { payload }: PayloadAction<IBranch>) => {
          const findIndex = state.branches.findIndex(
            (branch) => branch._id === payload._id
          );
          state.branches[findIndex] = payload;
        }
      );
  },
});

export const { AddingBranchs, deleteBranchs } = BranchSlice.actions;

export const BranchReducer = BranchSlice.reducer;
