import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from './message';

import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));

export const registerSlice = createAsyncThunk(
  'auth/register',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await AuthService.register(email, password);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message = (error.response
          && error.response.data
          && error.response.data.message)
        || error.message
        || error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  },
);

export const loginSlice = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(email, password);
      return { user: data };
    } catch (error) {
      const message = (error.response
          && error.response.data
          && error.response.data.message)
        || error.message
        || error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  },
);

export const logoutSlice = createAsyncThunk('auth/logout', async () => {
  await AuthService.logout();
});

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [registerSlice.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [registerSlice.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [loginSlice.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [loginSlice.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logoutSlice.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

const { reducer } = authSlice;
export default reducer;
