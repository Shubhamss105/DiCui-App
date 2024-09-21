import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiCall from '../../utils/api';
import { API_METHODS } from '../../utils/config';

const initialState = {
  loading: false,
  userInfo: {},
  userToken: null,
  error: null,
  success: false,
};

// Thunk to handle registration API call
export const registerUser = createAsyncThunk(
  '/register',
  async (userData, { rejectWithValue }) => {
    try {
      // API call to the registration endpoint
      const response = await apiCall('/register', API_METHODS.POST, userData);
      return response;
    } catch (error) {
      // Rejecting with error message for better error handling
      return rejectWithValue(error.message);
    }
  }
);

// Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // You can define more reducers if needed here
  },
  extraReducers: (builder) => {
    builder
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
        state.error = action.payload || 'Failed to register'; // Use payload for a more specific error
        state.success = false;
      });
  },
});

export default authSlice.reducer;
