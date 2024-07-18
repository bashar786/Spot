import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/UserInfoSlice'; // Adjust import path as per your project structure

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
