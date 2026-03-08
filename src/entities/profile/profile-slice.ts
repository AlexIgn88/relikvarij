import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { LoadProfileSuccessResponse, Profile } from 'src/entities/profile/profile-consts';
import { API, API_BASE_URL, ApiError } from 'src/shared/lib/common-consts';
import { RootState } from 'src/store/store';

type ProfileState = {
  profile: Profile | null;
};

const initialState: ProfileState = {
  profile: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile | null>) => {
      state.profile = action.payload;
    },
    clearProfile: (state) => {
      state.profile = null;
    },
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;

const selectProfileState = (state: RootState) => state.profile;

export const selectUserProfile = createSelector([selectProfileState], (profileState) => profileState.profile);

export const selectUserId = createSelector([selectUserProfile], (userProfile) => (userProfile ? userProfile.id : null));

export const loadProfile = createAsyncThunk<LoadProfileSuccessResponse, { token: string }, { rejectValue: ApiError[] }>(
  'profile/loadProfile',
  async ({ token }, { dispatch, rejectWithValue }) => {
    const response = await fetch(`${API_BASE_URL}${API.PROFILE}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (result.errors) {
      return rejectWithValue(result.errors as ApiError[]);
    }
    dispatch(setProfile(result));
  }
);
