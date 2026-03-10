import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { LoadProductsSuccessResponse, NewProduct, Product } from 'src/entities/product/items-consts';
import { API, API_BASE_URL, ApiError, LoadPageArg, LOCAL_STORAGE_KEYS, PAGE_SIZE } from 'src/shared/lib/common-consts';
import { THUNK_STATUSES, ThunkStatus } from 'src/store/store-consts';
import { RootState } from 'src/store/store';

type ItemsState = {
  loadItemsStatus: ThunkStatus;
  products: Product[];
  productsPageNumber: number;
  productsTotal: number;
  error: string | null;
};

const initialState: ItemsState = {
  loadItemsStatus: THUNK_STATUSES.DEFAULT,
  products: [],
  productsPageNumber: 0,
  productsTotal: 0,
  error: null,
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.loadItemsStatus = THUNK_STATUSES.PENDING;
      })
      .addCase(loadProducts.fulfilled, (state, { payload }) => {
        const { data, pagination } = payload;
        if (pagination.pageNumber === 1) {
          state.products = data;
        } else {
          state.products.push(...data);
        }
        state.productsPageNumber = pagination.pageNumber;
        state.productsTotal = pagination.total;
        state.loadItemsStatus = THUNK_STATUSES.FULFILLED;
      })
      .addCase(loadProducts.rejected, (state) => {
        state.loadItemsStatus = THUNK_STATUSES.REJECTED;
      });
  },
});

export const { addProduct, updateProduct } = itemsSlice.actions;

export default itemsSlice.reducer;

const selectItemsState = (state: RootState) => state.items;

export const selectloadItemsStatus = createSelector([selectItemsState], (itemsState) => itemsState.loadItemsStatus);

export const selectProducts = createSelector([selectItemsState], (itemsState) => itemsState.products);

export const selectProductsPagination = createSelector([selectItemsState], (itemsState) => ({
  pageNumber: itemsState.productsPageNumber,
  total: itemsState.productsTotal,
}));

export const loadProducts = createAsyncThunk<
  LoadProductsSuccessResponse,
  LoadPageArg,
  { state: RootState; rejectValue: ApiError[] }
>('items/loadProducts', async ({ pageNumber, pageSize = PAGE_SIZE }, { getState, rejectWithValue }) => {
  const { categoryIds } = getState().categories;

  const url = `${API_BASE_URL}${API.PRODUCTS}?categoryIds=${JSON.stringify(
    categoryIds
  )}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
  const response = await fetch(url);
  const result = await response.json();

  if (result.errors) {
    return rejectWithValue(result.errors as ApiError[]);
  }
  return result;
});

export const addNewProduct = createAsyncThunk<Product, NewProduct, { rejectValue: ApiError[] }>(
  'items/addNewProduct',
  async (data, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN_STORAGE_KEY);

    const response = await fetch(`${API_BASE_URL}${API.PRODUCTS}`, {
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

    dispatch(addProduct(result));
  }
);

export const editProduct = createAsyncThunk<
  Product,
  { id: string; data: Omit<NewProduct, 'createdAt'> },
  { rejectValue: ApiError[] }
>('items/editProduct', async ({ id, data }, { dispatch, rejectWithValue }) => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN_STORAGE_KEY);

  const response = await fetch(`${API_BASE_URL}${API.PRODUCTS}/${id}`, {
    method: 'PUT',
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

  dispatch(updateProduct(result));
});
