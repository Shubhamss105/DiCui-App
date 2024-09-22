import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
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
      const response = await apiPost('/login', userData);
      const { token, user } = response;
      await AsyncStorage.setItem('userToken', token);
      return { token, user };
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

// Thunk to handle registration API call
export const registerUser = createAsyncThunk(
  'register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await apiPost('/register', userData);
      await AsyncStorage.setItem('userToken', response.token);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loadToken = createAsyncThunk(
  'loadToken',
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        return { token };
      }
      return { token: null };
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

      AsyncStorage.removeItem('userToken');
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
      })
       .addCase(loadToken.fulfilled, (state, action) => {
        state.userToken = action.payload.token;
      })
      .addCase(loadToken.rejected, (state, action) => {
        state.error = action.payload || 'Failed to load token';
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
