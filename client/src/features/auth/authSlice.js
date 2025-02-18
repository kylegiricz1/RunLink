import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {addUser} from '../../services/authService';


export const signupUser = createAsyncThunk('auth/signupUser', async (user) => {
  const response = await addUser(user);
  return response;
});


const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null, loading: false, error: null },
    reducers: {},
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
            });
    }
});

export default authSlice.reducer;
