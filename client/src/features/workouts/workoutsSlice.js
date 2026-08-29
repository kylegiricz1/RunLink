// src/features/workouts/workoutsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWorkouts, deleteWorkout, addWorkout, joinWorkout, leaveWorkout} from '../../services/workoutService';

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

export const joinWorkoutById = createAsyncThunk('workouts/joinWorkoutById', async (workoutId, thunkAPI) => {
  try {
    return await joinWorkout(workoutId);
  
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
})

export const leaveWorkoutById = createAsyncThunk('workouts/leaveWorkoutById', async(workoutId, thunkAPI) => {
  try{
    return await leaveWorkout(workoutId);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
})

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
      })
      .addCase(joinWorkoutById.fulfilled, (state, action) => {
        const index = state.workouts.findIndex(w => w._id === action.payload.workout._id);
        if (index !== -1) state.workouts[index] = action.payload.workout;
      })
      .addCase(leaveWorkoutById.fulfilled, (state, action) => {
        const index = state.workouts.findIndex(w => w._id === action.payload.workout._id);
        if (index !== -1) state.workouts[index] = action.payload.workout;
      });
      
  },
});


export default workoutsSlice.reducer;
