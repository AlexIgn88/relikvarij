import { configureStore } from '@reduxjs/toolkit';
import type { MiddlewareAPI } from '@reduxjs/toolkit';

import authReducer from '../features/auth/auth-slice';
import profileReducer from 'src/entities/profile/profile-slice';
import cartReducer from '../entities/cart/cart-slice';
import itemsReducer from '../entities/product/items-slice';
import categoriesReducer from 'src/entities/categories/categories-slice';
import { storageSyncMiddleware } from './middleware/storage-sync';
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    categories: categoriesReducer,
    items: itemsReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, storageSyncMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = MiddlewareAPI<AppDispatch, RootState>;
