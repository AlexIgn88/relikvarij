import type { Middleware } from '@reduxjs/toolkit';
import { setToken } from 'src/features/auth/auth-slice';
import { clearProfile, loadProfile } from 'src/entities/profile/profile-slice';
import { LOCAL_STORAGE_KEYS } from 'src/common/common-consts';
import { AppStore } from 'src/store/store';

export const storageSyncMiddleware: Middleware = (store: AppStore) => {
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', (e: StorageEvent) => {
      if (e.key === LOCAL_STORAGE_KEYS.TOKEN_STORAGE_KEY) {
        if (e.newValue) {
          store.dispatch(setToken(e.newValue));
          store.dispatch(loadProfile({ token: e.newValue }));
        } else {
          store.dispatch(setToken(null));
          store.dispatch(clearProfile());
        }
      }
    });
  }

  return (next) => (action) => {
    return next(action);
  };
};
