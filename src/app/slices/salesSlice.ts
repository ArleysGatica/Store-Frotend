import { createDiscount, getAllDiscounts } from '@/api/services/sales';
import { IStatus } from '@/interfaces/branchInterfaces';
import { handleThunkError } from '@/shared/utils/errorHandlers';
import { IDescuentoCreate } from '@/ui/components/Discount/indes';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SalesState {
  discounts: IDescuentoCreate[];
  status: IStatus;
  error: string | null;
}

const initialState: SalesState = {
  discounts: [],
  status: 'idle',
  error: null,
};

export const createDiscountSales = createAsyncThunk(
  'sales/create',
  async (transfer: IDescuentoCreate, { rejectWithValue }) => {
    try {
      const response = await createDiscount(transfer);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleThunkError(error));
    }
  }
);

//GET
export const getDiscounts = createAsyncThunk('sales/get', async () => {
  try {
    const response = await getAllDiscounts();
    return response.data;
  } catch (error) {
    return handleThunkError(error);
  }
});

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    setDiscounts: (state, action: PayloadAction<IDescuentoCreate[]>) => {
      state.discounts = action.payload;
    },
    updateStatus: (state, action: PayloadAction<IStatus>) => {
      state.status = action.payload;
    },

    cleanDataSales: (state) => {
      state.discounts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDiscountSales.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createDiscountSales.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.discounts = [...state.discounts, payload as IDescuentoCreate];
      })
      .addCase(getDiscounts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getDiscounts.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.discounts = payload as IDescuentoCreate[];
      });
  },
});

export const { setDiscounts, updateStatus, cleanDataSales } =
  salesSlice.actions;

export const salesReducer = salesSlice.reducer;