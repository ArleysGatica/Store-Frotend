import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleThunkError } from '../../shared/utils/errorHandlers';
import {
  IShippedOrder,
  ITransfer,
  ITransferPost,
  ITransferSlice,
} from '@/interfaces/transferInterfaces';
import { createTransfer, getAllTransfer } from '@/api/services/transfer';

const initialState: ITransferSlice = {
  data: [],
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

export const getAllProductTransfer = createAsyncThunk(
  'transfer/getAll',
  async (_id: string) => {
    const response = await getAllTransfer(_id);
    return response;
  }
);

const transferSlice = createSlice({
  name: 'transfer',
  initialState,
  reducers: {
    setTransferData(state, action: PayloadAction<IShippedOrder[]>) {
      state.data = action.payload;
    },
    clearTransferData(state) {
      state.data = [];
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
      .addCase(getAllProductTransfer.pending, (state) => {
        state.status = 'loading';
      })

      .addCase(getAllProductTransfer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'unknown error';
      })

      .addCase(getAllProductTransfer.fulfilled, (state, payload) => {
        state.status = 'succeeded';
        state.data = [
          ...state.data,
          ...(payload.payload as unknown as IShippedOrder[]),
        ];
      });
  },
});

export const { setTransferData, clearTransferData } = transferSlice.actions;
export const transferReducer = transferSlice.reducer;
