import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import pdfReducer from './slices/pdfSlice';
import dashboardReducer from './slices/dashboardSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pdf: pdfReducer,
    dashboard: dashboardReducer,
    user: userReducer,
  },
});
