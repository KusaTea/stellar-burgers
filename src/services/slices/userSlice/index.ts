import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TRegisterData,
  TLoginData
} from '@api';

import { TUser } from '@utils-types';

import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { clearTokens, storeTokens } from '@tokens';

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData, { rejectWithValue }) => {
    const response = await registerUserApi(data);
    if (response?.success) {
      const { user, refreshToken, accessToken } = response;
      storeTokens(refreshToken, accessToken);
      return user;
    }
    return rejectWithValue(response);
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData, { rejectWithValue }) => {
    const response = await loginUserApi(data);
    if (response?.success) {
      const { user, refreshToken, accessToken } = response;
      storeTokens(refreshToken, accessToken);
      return user;
    }
    return rejectWithValue(response);
  }
);

export const getUser = createAsyncThunk(
  'user/getInfo',
  async (_, { rejectWithValue }) => {
    const response = await getUserApi();
    if (response?.success) {
      return response.user;
    }
    return rejectWithValue(response);
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (data: Partial<TRegisterData>, { rejectWithValue }) => {
    const response = await updateUserApi(data);
    if (response?.success) {
      return response.user;
    }
    return rejectWithValue(response);
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    const response = await logoutApi();
    if (response?.success) {
      clearTokens();
    }
    return rejectWithValue(response);
  }
);

type TUserState = {
  loading: boolean;
  authChecked: boolean;
  authenticated: boolean;
  registerError: string | null;
  loginError: string | null;
  authError: string | null;
  data: TUser;
};

const initialState: TUserState = {
  loading: false,
  authChecked: false,
  authenticated: false,
  data: {
    name: '',
    email: ''
  },
  registerError: null,
  loginError: null,
  authError: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.registerError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.registerError = action.error.message
          ? action.error.message
          : 'error';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.authenticated = true;
        state.data = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.loginError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.registerError = action.error.message
          ? action.error.message
          : 'error';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.authenticated = true;
        state.data = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.authChecked = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.authenticated = true;
        state.authChecked = true;
        state.data = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.authenticated = false;
        state.authChecked = false;
        state.data = { name: '', email: '' };
      });
  }
});