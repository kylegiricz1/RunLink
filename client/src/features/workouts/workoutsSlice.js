// src/features/workouts/workoutsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWorkouts, deleteWorkout, addWorkout, joinWorkout} from '../../services/workoutService';

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
    const token = thunkAPI.getState().auth.user.token;
    return await joinWorkout(workoutId, token);
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
        if (index !== -1) {
          const updatedWorkout = { 
            ...state.workouts[index], 
            participants: [...state.workouts[index].participants, action.payload.workout.participants]
          };
          state.workouts[index] = updatedWorkout;
        }
      });
  },
});


export default workoutsSlice.reducer;
