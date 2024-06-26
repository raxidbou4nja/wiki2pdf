import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import pdfReducer from './slices/pdfSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pdf: pdfReducer,
  },
});
