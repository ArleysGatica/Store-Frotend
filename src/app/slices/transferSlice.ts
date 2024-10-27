import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleThunkError } from '../../shared/utils/errorHandlers';
import {
  IPendingTransfer,
  ITransfer,
  ITransferPost,
  ITransferSlice,
} from '@/interfaces/transferInterfaces';
import { createTransfer, fetchPendingTransfers } from '@/api/services/transfer';
import { IStatus } from '@/interfaces/branchInterfaces';

const initialState: ITransferSlice = {
  sent: [],
  received: [],
  pending: [],
  status: 'idle',
  error: null,
};

export const createProductTransfer = createAsyncThunk(
  'transfer/create',
  async (transfer: ITransferPost, { rejectWithValue }) => {
    try {
      const response = await createTransfer(transfer);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleThunkError(error));
    }
  }
);

export const getPendingTransfers = createAsyncThunk(
  'transfer/getPending',
  async (sucursalId: string, { rejectWithValue }) => {
    try {
      const response = await fetchPendingTransfers(sucursalId);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleThunkError(error));
    }
  }
);

const transferSlice = createSlice({
  name: 'transfer',
  initialState,
  reducers: {
    updateStatus: (state, action: PayloadAction<IStatus>) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProductTransfer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        createProductTransfer.fulfilled,
        (state, { payload }: PayloadAction<ITransfer>) => {
          state.status = 'succeeded';
          state.sent = [...state.sent, payload];
        }
      )
      .addCase(createProductTransfer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'unknown error';
      })
      .addCase(
        getPendingTransfers.fulfilled,
        (state, { payload }: PayloadAction<IPendingTransfer[]>) => {
          state.status = 'succeeded';
          state.pending = payload;
        }
      );
  },
});

export const { updateStatus } = transferSlice.actions;
export const transferReducer = transferSlice.reducer;
