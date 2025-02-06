import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  b2cAccessToken: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setB2cAccessToken: (state, action) => {
      state.b2cAccessToken = action.payload;
    }
    // other reducers...
  }
});

export const { setB2cAccessToken } = authSlice.actions;
export default authSlice.reducer; // <--- this is your authReducer
