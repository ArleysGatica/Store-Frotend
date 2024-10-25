import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { handleAsyncThunkError } from '../../shared/utils/errorHandlers';
import {
  createGroup,
  getAllGroups,
  IProductoGroups,
} from '@/api/services/groups';
import { statusProgressLogin } from './login';

export const createGroupSlice = createAsyncThunk(
  'groups/create',
  async (group: IProductoGroups, { rejectWithValue }) => {
    try {
      const response = await createGroup(group);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        const errorMessage = //@ts-ignore
          axiosError.response.data?.errors?.[0]?.message ||
          'Ocurrió un error en la solicitud';
        return rejectWithValue(errorMessage);
      }

      return rejectWithValue(handleAsyncThunkError(error as Error));
    }
  }
);

export const getAllGroupsSlice = createAsyncThunk('groups/getAll', async () => {
  try {
    const response = await getAllGroups();
    return response as unknown as IProductoGroups[];
  } catch (error) {
    return (error as AxiosError).response?.status === 404
      ? []
      : handleAsyncThunkError(error as Error);
  }
});

interface GroupState {
  groups: IProductoGroups[];
  error: string | null;
  status: statusProgressLogin;
}

const initialState: GroupState = {
  groups: [] as IProductoGroups[],
  error: null,
  status: 'idle',
};

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    AddingGroups: (state, action: PayloadAction<IProductoGroups>) => {
      state.groups.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllGroupsSlice.pending, (state) => {
        state.groups = [];
        state.status = 'loading';
      })
      .addCase(
        getAllGroupsSlice.fulfilled,
        (state, { payload }: PayloadAction<Array<IProductoGroups>>) => {
          state.status = 'succeeded';
          state.groups = payload;
        }
      )
      .addCase(getAllGroupsSlice.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'unknown error';
      });
  },
});

export const { AddingGroups } = groupsSlice.actions;

export const groupsReducer = groupsSlice.reducer;
