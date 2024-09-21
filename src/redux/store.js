// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice.js';
import authReducer from './slices/authSlice.js'

const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer, 
  },
});

export default store;
