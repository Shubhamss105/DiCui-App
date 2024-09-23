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
      // await AsyncStorage.setItem('userToken', token);
      return { token, user };
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message || 'Login failed';
      return rejectWithValue(errorMessage);
    }
  }
);

// Thunk to verify OTP and get the token
export const verifyOtp = createAsyncThunk(
  'verifyOtp',
  async ({ otp, email }, { rejectWithValue }) => {
    try {
      const response = await apiPost('/verify-otp', { otp, email });
      const { token, user } = response;
      await AsyncStorage.setItem('userToken', token);
      return { token, user };
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message || 'OTP verification failed';
      return rejectWithValue(errorMessage);
    }
  }
);


// Thunk to handle registration API call
export const registerUser = createAsyncThunk(
  'register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await apiPost('/register', userData);
      // await AsyncStorage.setItem('userToken', response.token);
      return response;
    } catch (error) {
      // Capture error message from backend response
      const errorMessage = error.message || 'Registration failed';
      return rejectWithValue(errorMessage);
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
      // Handle Login (OTP sent)
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message; // OTP sent message
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
        state.success = false;
      })

      // Handle OTP Verification
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.user;
        state.userToken = action.payload.token;
        state.success = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'OTP verification failed';
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

      // Load Token
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

