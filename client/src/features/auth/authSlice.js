import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {addUser, signInUser} from '../../services/authService';


export const signupUser = createAsyncThunk('auth/signupUser', async (user) => {
  const response = await addUser(user);
  return response;
});

export const loginUser = createAsyncThunk('auth/loginUser', async (user) => {
    const response = await signInUser(user);
    return response;
});



const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: localStorage.getItem('token') || null, loading: false, error: null },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
          }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => { state.loading = true; })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(loginUser.pending, (state) => { state.loading = true; })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const { logout, login } = authSlice.actions;

export default authSlice.reducer;
