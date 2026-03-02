import { AppDispatch } from 'src/store/store';
import { setToken, setInitialized, removeToken } from 'src/features/auth/auth-slice';
import { clearProfile, loadProfile } from 'src/features/profile/profile-slice';
import { LOCAL_STORAGE_KEYS } from 'src/common/common-consts';

export const loadTokenFromStorage = () => (dispatch: AppDispatch) => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN_STORAGE_KEY);
  if (token) {
    dispatch(setToken(token));
    dispatch(loadProfile({ token }));
  }
  dispatch(setInitialized(true));
};

export const saveTokenToStorage = (token: string) => (dispatch: AppDispatch) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN_STORAGE_KEY, token);
  dispatch(setToken(token));
};

export const removeTokenFromStorage = () => (dispatch: AppDispatch) => {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN_STORAGE_KEY);
  dispatch(removeToken());
};

export const logout = () => (dispatch: AppDispatch) => {
  dispatch(removeTokenFromStorage());
  dispatch(clearProfile());
};
