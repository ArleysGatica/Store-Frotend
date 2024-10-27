import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleThunkError } from '../../shared/utils/errorHandlers';
import {
  ITransfer,
  ITransferPost,
  ITransferSlice,
} from '@/interfaces/transferInterfaces';
import { createTransfer } from '@/api/services/transfer';

const initialState: ITransferSlice = {
  sent: [],
  received: [],
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

const transferSlice = createSlice({
  name: 'transfer',
  initialState,
  reducers: {},
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
      });
  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = transferSlice.actions;
export const transferReducer = transferSlice.reducer;
