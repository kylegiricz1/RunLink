// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import workoutsReducer from './features/workouts/workoutsSlice';
import authReducer from './features/auth/authSlice'
const store = configureStore({
  reducer: {
    workouts: workoutsReducer,
    auth: authReducer,
  },
});

export default store;
