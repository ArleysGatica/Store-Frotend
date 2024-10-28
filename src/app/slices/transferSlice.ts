import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleThunkError } from '../../shared/utils/errorHandlers';
import {
  IShippedOrder,
  IPendingTransfer,
  ITransfer,
  ITransferPost,
  ITransferSlice,
  IDetalleSelected,
} from '@/interfaces/transferInterfaces';
import {
  createTransfer,
  fetchPendingTransfers,
  getAllOrdersReceipts,
  getAllOrdersReceivedById,
  getAllTransfer,
} from '@/api/services/transfer';
import { IStatus } from '@/interfaces/branchInterfaces';

const initialState: ITransferSlice = {
  data: [],
  sent: [],
  received: [],
  pending: [],
  selectedItem: null,
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
  'transfer/Send',
  async (_id: string) => {
    const response = await getAllTransfer(_id);
    return response;
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

export const receiveTransfer = createAsyncThunk(
  'transfer/receive',
  async (sucursalId: string, { rejectWithValue }) => {
    try {
      const response = await getAllOrdersReceipts(sucursalId);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleThunkError(error));
    }
  }
);

export const OrdersReceivedById = createAsyncThunk(
  'transfer/OrdersReceivedById',
  async (sucursalId: string, { rejectWithValue }) => {
    try {
      const response = await getAllOrdersReceivedById(sucursalId);
      return response;
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
    setTransferData(state, action: PayloadAction<IShippedOrder[]>) {
      state.data = action.payload;
    },
    clearTransferData(state) {
      state.data = [];
    },
    setSelectItemDetail: (state, action: PayloadAction<IDetalleSelected>) => {
      state.selectedItem = {
        traslado: action.payload.traslado,
        listItemDePedido: action.payload.listItemDePedido,
      };
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
      })
      .addCase(
        getPendingTransfers.fulfilled,
        (state, { payload }: PayloadAction<IPendingTransfer[]>) => {
          state.status = 'succeeded';
          state.pending = payload;
        }
      )
      .addCase(
        receiveTransfer.fulfilled,
        (state, { payload }: PayloadAction<IPendingTransfer[]>) => {
          state.status = 'succeeded';
          state.pending = payload;
        }
      )
      .addCase(OrdersReceivedById.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';

        state.selectedItem = {
          traslado: payload.data?.traslado,
          listItemDePedido: payload.data?.listItemDePedido,
        };
      });
  },
});

export const {
  setTransferData,
  setSelectItemDetail,
  clearTransferData,
  updateStatus,
} = transferSlice.actions;

export const transferReducer = transferSlice.reducer;
