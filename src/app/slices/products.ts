import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { handleAsyncThunkError } from '../../shared/utils/errorHandlers';
import { createTablaBranch } from '@/api/services/tablaBranchs';
import { ITablaBranch } from '@/interfaces/branchInterfaces';

export const createProduct = createAsyncThunk(
  'products/create',
  async (product: ITablaBranch, { rejectWithValue }) => {
    try {
      const response = await createTablaBranch(product);
      return response.data as ITablaBranch;
    } catch (error) {
      if ((error as AxiosError).response?.status === 404) {
        return rejectWithValue('El recurso no fue encontrado');
      }
      return rejectWithValue(handleAsyncThunkError(error as Error));
    }
  }
);

interface ProductState {
  products: ITablaBranch[];
  error: string | null;
}

const initialState: ProductState = {
  products: [] as ITablaBranch[],
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    AddingProducts: (state, action: PayloadAction<ITablaBranch>) => {
      state.products.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.error = null;
      })
      .addCase(
        createProduct.fulfilled,
        (state, { payload }: PayloadAction<ITablaBranch>) => {
          state.products.push(payload);
        }
      )
      .addCase(createProduct.rejected, (state, action) => {
        state.error = action.error.message || 'unknown error';
      });
  },
});

export const productsReducer = productsSlice.reducer;
