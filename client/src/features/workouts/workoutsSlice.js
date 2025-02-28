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
    const token = thunkAPI.getState().auth.user.token;
    return await joinWorkout(workoutId, token);
  
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
})

export const leaveWorkoutById = createAsyncThunk('workouts/leaveWorkoutById', async(workoutId, thunkAPI) => {
  try{
    const token = thunkAPI.getState().auth.user.token;
    return await leaveWorkout(workoutId, token);
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
        const storedUser = JSON.parse(localStorage.getItem('storedUser'));
        const participant = storedUser ? { _id: storedUser.id } : null; 
      
        if (index !== -1 && participant) {
          const updatedWorkout = { 
            ...state.workouts[index], 
            participants: [...state.workouts[index].participants, participant] 
          };
          console.log(updatedWorkout);
          state.workouts[index] = updatedWorkout;
        }
      })
      .addCase(leaveWorkoutById.fulfilled, (state, action) => {
        const { workout } = action.payload;
        const workoutId = workout._id; 
        const storedUser = JSON.parse(localStorage.getItem('storedUser'));
        const participantId = storedUser ? storedUser.id : null; 
        console.log(action.payload);
       
        const index = state.workouts.findIndex(w => w._id === workoutId);
      
        if (index !== -1) {
          const updatedWorkout = { 
            ...state.workouts[index],
            participants: state.workouts[index].participants.filter(
              participant => participant._id !== participantId 
            )
          };
          
          state.workouts[index] = updatedWorkout;
        }
      });
      
  },
});


export default workoutsSlice.reducer;
