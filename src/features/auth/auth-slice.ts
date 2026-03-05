import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { API, API_BASE_URL, ApiError, COMMAND_ID } from 'src/common/common-consts';
import { saveTokenToStorage } from 'src/features/auth/auth-thunks';
import { SignInBody, SignInSuccessResponse, SignUpBody, SignupSuccessResponse } from 'src/features/auth/auth-consts';
import { setProfile } from 'src/features/profile/profile-slice';
import { RootState } from 'src/store/store';
import { useNavigate } from 'react-router-dom';

type AuthState = {
  token: string | null;
  isInitialized: boolean;
  loading: boolean;
  error: ApiError[] | null;
};

const initialState: AuthState = {
  token: null,
  isInitialized: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
    removeToken: (state) => {
      state.token = null;
    },
    signupSagaRequest: (state, action: PayloadAction<{ data: SignUpBody; navigate: (path: string) => void }>) => {
      state.error = null;
    },
    signupSagaSuccess: (state) => {
      state.error = null;
    },
    signupSagaFailure: (state, action: PayloadAction<ApiError[]>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signin.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;

export const { setToken, setInitialized, removeToken, signupSagaRequest, signupSagaSuccess, signupSagaFailure } =
  authSlice.actions;

const selectAuthState = (state: RootState) => state.auth;

export const selectToken = createSelector([selectAuthState], (authState) => authState.token);

export const selectAuthError = (state: RootState) => state.auth.error;

export const selectAuthErrorMessages = createSelector([selectAuthError], (error) => error?.map((e) => e.message) ?? []);

export const signup = createAsyncThunk<
  SignupSuccessResponse,
  { data: SignUpBody; navigate: ReturnType<typeof useNavigate> },
  { rejectValue: ApiError[] }
>('auth/signup', async ({ data, navigate }, { dispatch, rejectWithValue }) => {
  const newUserData = { ...data, commandId: COMMAND_ID };
  const response = await fetch(`${API_BASE_URL}${API.SIGNUP}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUserData),
  });

  const result = await response.json();

  if (result.errors) {
    return rejectWithValue(result.errors as ApiError[]);
  }
  const { token, profile } = result;

  dispatch(saveTokenToStorage(token));
  dispatch(setProfile(profile));
  navigate('/');
});

export const signin = createAsyncThunk<
  SignInSuccessResponse,
  { data: SignInBody; navigate: ReturnType<typeof useNavigate> },
  { rejectValue: ApiError[] }
>('auth/signin', async ({ data, navigate }, { dispatch, rejectWithValue }) => {
  const response = await fetch(`${API_BASE_URL}${API.SIGNIN}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (result.errors) {
    return rejectWithValue(result.errors as ApiError[]);
  }
  const { token, profile } = result;

  dispatch(saveTokenToStorage(token));
  dispatch(setProfile(profile));
  navigate('/');
});
