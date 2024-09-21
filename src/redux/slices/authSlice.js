import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {apiPost} from '../../utils/api';

const initialState = {
  loading: false,
  userInfo: {},
  userToken: null,
  error: null,
  success: false,
};

// Thunk to handle login API call
export const loginUser = createAsyncThunk(
  'login',
  async (userData, { rejectWithValue }) => {
    try {
      // API call to the login endpoint
      const response = await apiPost('/login', userData);
      return response;
    } catch (error) {
      // Rejecting with error message for better error handling
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to handle registration API call
export const registerUser = createAsyncThunk(
  'register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await apiPost('/register', userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Logout action
    logout: (state) => {
      state.loading = false;
      state.userInfo = {};
      state.userToken = null;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.user;
        state.userToken = action.payload.token;
        state.success = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
        state.success = false;
      })

      // Handle Registration
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.user;
        state.userToken = action.payload.token;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to register';
        state.success = false;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
