import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Now this should work

export const store = configureStore({
  reducer: {
    auth: authReducer
  },
});

export default store;
