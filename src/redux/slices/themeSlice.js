// store/themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  primaryColor: '#FFE5CF', // Default primary color
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setPrimaryColor: (state, action) => {
      state.primaryColor = action.payload;
    },
  },
});

export const { setPrimaryColor } = themeSlice.actions;

export default themeSlice.reducer;
