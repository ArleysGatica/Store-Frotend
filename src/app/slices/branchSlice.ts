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
import {
  handleAsyncThunkError,
  handleThunkError,
} from '../../shared/utils/errorHandlers';
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

export interface IBranchWithProducts extends Branch {
  products: ITablaBranch[];
}

interface BranchState {
  data: Branch[];
  selectedBranch: IBranchWithProducts | null;
  loading: boolean;
  error: string | null;
}

const initialState: BranchState = {
  data: [], // Inicializar como un arreglo vacío
  selectedBranch: null,
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
  async (_id: string) => {
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
      return rejectWithValue(handleThunkError(error));
    }
  }
);

const branchesSlice = createSlice({
  name: 'branches',
  initialState,
  reducers: {
    AddingBranchs: (state, action: PayloadAction<Branch>) => {
      state.data.push(action.payload);
    },
    setSelectedBranch: (state, action: PayloadAction<Branch>) => {
      state.selectedBranch = {
        ...action.payload,
        products: state.selectedBranch?.products ?? [],
      };
    },
    updateSelectedBranch: (
      state,
      action: PayloadAction<IBranchWithProducts | null>
    ) => {
      state.selectedBranch = action.payload;
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
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createBranchs.fulfilled,
        (state, action: PayloadAction<Branch>) => {
          state.loading = false;
          state.data.push(action.payload);
        }
      )
      .addCase(createBranchs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'unknown error';
      })
      .addCase(
        fetchBranchesById.fulfilled,
        (state, { payload }: PayloadAction<ITablaBranch[]>) => {
          state.selectedBranch = {
            ...state.selectedBranch!,
            products: payload,
          };
        }
      );
  },
});

export const { setSelectedBranch, updateSelectedBranch } =
  branchesSlice.actions;
export const branchesReducer = branchesSlice.reducer;
