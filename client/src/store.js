// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import workoutsReducer from './features/workouts/workoutsSlice';

const store = configureStore({
  reducer: {
    workouts: workoutsReducer,
  },
});

export default store;
