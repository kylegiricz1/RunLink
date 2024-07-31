// src/features/workouts/workoutsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWorkouts, deleteWorkout, addWorkout } from '../../services/workoutService';

export const fetchAllWorkouts = createAsyncThunk('workouts/fetchAll', async () => {
  const response = await fetchWorkouts();
  return response;
});

export const deleteWorkoutById = createAsyncThunk('workouts/deleteById', async (id) => {
  await deleteWorkout(id);
  return id;
});

export const createWorkout = createAsyncThunk('workouts/create', async (newWorkout) => {
  const response = await addWorkout(newWorkout);
  return response;
});

const workoutsSlice = createSlice({
  name: 'workouts',
  initialState: {
    workouts: [],
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllWorkouts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllWorkouts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.workouts = action.payload;
      })
      .addCase(fetchAllWorkouts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteWorkoutById.fulfilled, (state, action) => {
        state.workouts = state.workouts.filter(workout => workout._id !== action.payload);
      })
      .addCase(createWorkout.fulfilled, (state, action) => {
        state.workouts.push(action.payload);
      });
  },
});


export default workoutsSlice.reducer;
