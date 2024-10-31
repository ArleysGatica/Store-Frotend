import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  handleAsyncThunkError,
  handleThunkError,
} from '../../shared/utils/errorHandlers';
import {
  createTablaBranch,
  inventoryAllProduct,
  inventoryGetAll,
  inventoryGetProdutsTransit,
  inventoryUpdateProduct,
} from '@/api/services/products';
import { IStatus, ITablaBranch } from '@/interfaces/branchInterfaces';
import { InventarioSucursal, IProductInTransit } from '@/interfaces/transferInterfaces';

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

export const productsTransit = createAsyncThunk(
  'products/getAllTransit',
  async (sucursalId: string, { rejectWithValue }) => {
    try {
      const response = await inventoryGetProdutsTransit(sucursalId);
      return response;
    } catch (error) {
      return rejectWithValue(handleThunkError(error));
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/update',
  async (product: string, { rejectWithValue }) => {
    try {
      const response = await inventoryUpdateProduct(product);
      return response;
    } catch (error) {
      return rejectWithValue(handleThunkError(error));
    }
  }
);

export const fetchAllProducts = createAsyncThunk<
  ITablaBranch[],
  void,
  { rejectValue: string }
>('products/getAll', async (_, { rejectWithValue }) => {
  try {
    const response = await inventoryAllProduct();
    return response;
  } catch (error) {
    return rejectWithValue(handleThunkError(error));
  }
});

interface ProductState {
  products: ITablaBranch[];
  error: string | null;
  transitProducts: IProductInTransit[];
  status: IStatus;
}

const initialState: ProductState = {
  products: [] as ITablaBranch[],
  transitProducts: [],
  status: 'idle',
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchAllProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProducts.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.products = payload;
      })
      .addCase(fetchAllProducts.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload || 'Error fetching products';
      })
      .addCase(productsTransit.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(productsTransit.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        console.log(payload, 'data');
        state.transitProducts = payload as unknown as IProductInTransit[];
      })
      .addCase(updateProduct.pending, (state) => {
        state.status = 'loading';
      });
  },
});

export const { clearProducts } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
