import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Product } from 'src/entities/product/items-consts';
import { CartItem, CreateOrderSuccessResponse, ProductsForOrder } from 'src/entities/cart/cart-consts';
import { API, API_BASE_URL, ApiError, LOCAL_STORAGE_KEYS } from 'src/shared/lib/common-consts';
import { THUNK_STATUSES, ThunkStatus } from 'src/store/store-consts';

import { RootState } from 'src/store/store';

type CartState = {
  loadItemsStatus: ThunkStatus;
  items: CartItem[];
};

const initialState: CartState = {
  loadItemsStatus: THUNK_STATUSES.DEFAULT,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find((item) => item.product.id === action.payload.id);
      state.loadItemsStatus = THUNK_STATUSES.DEFAULT;
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.product.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const item = state.items.find((item) => item.product.id === action.payload.productId);
      if (item) {
        item.quantity = action.payload.quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter((item) => item.product.id !== action.payload.productId);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loadItemsStatus = THUNK_STATUSES.PENDING;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.loadItemsStatus = THUNK_STATUSES.FULFILLED;
      })
      .addCase(createOrder.rejected, (state) => {
        state.loadItemsStatus = THUNK_STATUSES.REJECTED;
      });
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

const selectCartState = (state: RootState) => state.cart;

export const selectloadItemsStatus = (state: RootState) => selectCartState(state).loadItemsStatus;

export const selectCartItems = createSelector([selectCartState], (cartState) => cartState.items);

export const selectProducts = createSelector([selectCartItems], (cartItems) => cartItems.map((item) => item.product));

export const selectCartTotalPrice = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)
);

export const selectCartTotalQuantity = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((sum, item) => sum + item.quantity, 0)
);

export const createOrder = createAsyncThunk<CreateOrderSuccessResponse, ProductsForOrder, { rejectValue: ApiError[] }>(
  'cart/createOrder',
  async (productsForOrder, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN_STORAGE_KEY);
    const data = {
      products: productsForOrder,
      status: 'pending_confirmation',
    };

    const response = await fetch(`${API_BASE_URL}${API.ORDERS}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (result.errors) {
      return rejectWithValue(result.errors as ApiError[]);
    }
    dispatch(clearCart());
    return result;
  }
);
