import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadState } from '../storage/storage';
import axios, { AxiosError } from 'axios';

export interface UserPersistentState {
  jwt: string | null;
}

export interface UserState {
  jwt: string | null;
  loginErrorMessage?: string;
  registerErrorMessage?: string;
}

const initialState: UserState = {
  jwt: loadState<UserPersistentState>('userData')?.jwt ?? null,
};

export const login = createAsyncThunk('user/login', async (params: { email: string; password: string }) => {
  try {
    const { data } = await axios.post('http://localhost:3000/login', {
      email: params.email,
      password: params.password,
    });
    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data.error);
    }
  }
});

export const register = createAsyncThunk(
  'user/register',
  async (params: { name: string; email: string; password: string }) => {
    try {
      const { data } = await axios.post('http://localhost:3000/register', {
        email: params.email,
        password: params.password,
        name: params.name,
      });
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.error);
      }
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.jwt = null;
    },
    clearLoginError: (state) => {
      state.loginErrorMessage = undefined;
    },
    clearRegisterError: (state) => {
      state.registerErrorMessage = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.jwt = action.payload.token;
      state.loginErrorMessage = undefined;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginErrorMessage = action.error.message;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.jwt = action.payload.token;
      state.registerErrorMessage = undefined;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.registerErrorMessage = action.error.message;
    });
  },
});

export default userSlice.reducer;
export const userAction = userSlice.actions;
