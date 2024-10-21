import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import {
  createUsers,
  Iauth,
  IAuthCredentials,
  registerUsers,
} from '../../api/services/auth';
import { handleAsyncThunkError } from '../../shared/utils/errorHandlers';
export interface IUser {
  id: string;
  username: string;
}

export const login = createAsyncThunk('login/create', async (data: Iauth) => {
  try {
    const response = await createUsers(data);
    return response as unknown as string;
  } catch (error) {
    return (error as AxiosError).response?.status === 404
      ? []
      : handleAsyncThunkError(error as Error);
  }
});

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (
    { userCredentials }: { userCredentials: IAuthCredentials },
    { rejectWithValue }
  ) => {
    try {
      const response = await registerUsers(userCredentials);
      if (response.data.error) {
        return rejectWithValue(response.data.error);
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.error || 'Error desconocido'
        );
      }
      return rejectWithValue('Error en la solicitud');
    }
  }
);

type statusProgressLogin = 'idle' | 'loading' | 'succeeded' | 'failed';
export type statusLoguer =
  | 'authenticated'
  | 'unauthenticated'
  | 'loading'
  | 'error'
  | 'idle';
export interface IAuthSlice extends Iauth {
  status: statusLoguer;
  token?: string;
}

const initialStateLogin: IAuthSlice = (() => {
  const persistedState = localStorage.getItem('user');
  return persistedState ? JSON.parse(persistedState) : {};
})();

export interface ILoginSlice {
  signIn: IAuthSlice;
  signUp: Iauth;
  status: statusProgressLogin;
  error?: string;
}

const initialState: ILoginSlice = {
  signIn: initialStateLogin,
  signUp: {
    username: '',
    password: '',
    role: '',
  },
  status: 'idle',
  error: '',
};

export const LoginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    updateSignIn: (state, action: PayloadAction<IAuthSlice>) => {
      state.signIn = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    updateSignUp: (state, action: PayloadAction<Iauth>) => {
      state.signUp = action.payload;
    },
    logout: (state) => {
      state.signIn = {
        username: state.signIn.username,
        status: state.signIn.status,
        role: '',
        password: '',
      };
      localStorage.setItem(
        'user',
        JSON.stringify({
          status: 'unauthenticated',
          email: state.signIn.username,
        })
      );
    },

    errorLogin: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(login.fulfilled, (state) => {
      state.status = 'succeeded';
    });
    builder.addCase(login.rejected, (state, { error }) => {
      if (error.message) state.error = error.message;
      state.status = 'failed';
    });
    builder.addCase(registerUser.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.signIn = payload as unknown as IAuthSlice;
      state.status = 'succeeded';
    });
    builder.addCase(registerUser.rejected, (state, { error }) => {
      if (error.message) state.error = error.message;
      console.error('Error logging in:', error.message);
      state.status = 'failed';
    });
  },
});

export const { updateSignIn, updateSignUp, logout } = LoginSlice.actions;
export const loginReducer = LoginSlice.reducer;
