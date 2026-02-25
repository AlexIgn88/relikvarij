import { AppDispatch } from 'src/store/store';
import { setToken, setInitialized, removeToken } from 'src/features/auth/auth-slice';
import { setProfile, clearProfile, loadProfile } from 'src/features/profile/profile-slice';
import { LOCAL_STORAGE_KEYS } from 'src/common/common-consts';
import { createFakeProfile } from 'src/features/profile/profile-consts';

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

//Функция для создания мокового профиля для предыдущего задания
export const fakeLogin = (email: string, password: string) => (dispatch: AppDispatch) => {
  const token = `fake_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  dispatch(saveTokenToStorage(token));
  dispatch(setProfile(createFakeProfile(token, { email, password })));
};

export const logout = () => (dispatch: AppDispatch) => {
  dispatch(removeTokenFromStorage());
  dispatch(clearProfile());
};
