import { configureStore } from '@reduxjs/toolkit';
import type { MiddlewareAPI } from '@reduxjs/toolkit';

import authReducer from '../features/auth/auth-slice';
import profileReducer from '../features/profile/profile-slice';
import cartReducer from '../features/cart/cart-slice';
import itemsReducer from '../features/items/items-slice';
import { storageSyncMiddleware } from './middleware/storage-sync';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
    items: itemsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(storageSyncMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = MiddlewareAPI<AppDispatch, RootState>;
