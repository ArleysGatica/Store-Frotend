// imports necesarios
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  createBranch,
  deleteBranchById,
  getAll,
  getBranchesById,
  updateBranch,
} from '../../api/services/branch';
import { handleAsyncThunkError } from '../../shared/utils/errorHandlers';
import { ITablaBranch } from '@/interfaces/branchInterfaces';

export interface Branch {
  _id?: string;
  pais: string;
  ciudad: string;
  nombre: string;
  telefono: string;
  direccion: string;
  description: string;
}

interface BranchState {
  data: Branch[];
  loading: boolean;
  error: string | null;
}

const initialState: BranchState = {
  data: [], // Inicializar como un arreglo vacío
  loading: false,
  error: null,
};

export const fetchBranchesById = createAsyncThunk<ITablaBranch[], string>(
  'branches/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response: ITablaBranch[] = await getBranchesById(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Error desconocido');
    }
  }
);

export const fetchBranches = createAsyncThunk('branches/getAll', async () => {
  try {
    const response = await getAll();
    return response as unknown as Branch[];
  } catch (error) {
    return (error as AxiosError).response?.status === 404
      ? []
      : handleAsyncThunkError(error as Error);
  }
});

export const updateBranchs = createAsyncThunk(
  'branches/update',
  async (payload: { branch: Branch; id: string }) => {
    try {
      const { branch, id } = payload;
      const response = await updateBranch(branch, id);
      return response as unknown as Branch;
    } catch (error) {
      handleAsyncThunkError(error as Error);
      throw error;
    }
  }
);

export const deleteBranch = createAsyncThunk(
  'branches/delete',
  async ({ _id }: Branch) => {
    const response = await deleteBranchById(_id!);
    return response;
  }
);

export const createBranchs = createAsyncThunk(
  'branches/create',
  async (branch: Branch, { rejectWithValue }) => {
    try {
      const response = await createBranch(branch);
      return response.data as Branch;
    } catch (error) {
      if ((error as AxiosError).response?.status === 404) {
        return rejectWithValue('El recurso no fue encontrado');
      }
      return rejectWithValue(handleAsyncThunkError(error as Error));
    }
  }
);

// Paso 2: Crear el slice
const branchesSlice = createSlice({
  name: 'branches',
  initialState,
  reducers: {
    AddingBranchs: (state, action: PayloadAction<Branch>) => {
      state.data.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBranches.pending, (state) => {
        state.data = [];
        state.loading = 'loading' === 'loading';
      })
      .addCase(
        fetchBranches.fulfilled,
        (state, { payload }: PayloadAction<Array<Branch>>) => {
          state.loading = 'succeeded' === 'succeeded';
          state.data = payload;
        }
      )
      .addCase(fetchBranches.rejected, (state, action) => {
        state.loading;
        state.error = action.error.message || 'unknown error';
      })

      .addCase(createBranchs.pending, (state) => {
        state.loading = true; // Cambia a loading
        state.error = null; // Reinicia el error
      })
      .addCase(
        createBranchs.fulfilled,
        (state, action: PayloadAction<Branch>) => {
          state.loading = false; // Cambia a no loading
          state.data.push(action.payload); // Agrega la nueva sucursal al estado
        }
      )
      .addCase(createBranchs.rejected, (state, action) => {
        state.loading = false; // Cambia a no loading
        state.error = action.error.message || 'unknown error'; // Manejo de errores
      });
  },
});

// Exportamos el reducer
export const branchesReducer = branchesSlice.reducer;
