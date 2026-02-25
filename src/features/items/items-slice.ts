import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Product, Operation } from 'src/homeworks/ts1/3_write';
import {
  LoadOperationsSuccessResponse,
  LoadProductsSuccessResponse,
  NewOperation,
  NewProduct,
} from 'src/features/items/items-consts';
import { API, API_BASE_URL, ApiError, LoadPageArg, LOCAL_STORAGE_KEYS, PAGE_SIZE } from 'src/common/common-consts';
import { THUNK_STATUSES, ThunkStatus } from 'src/store/store-consts';
import { RootState } from 'src/store/store';

type ItemsState = {
  loadItemsStatus: ThunkStatus;
  products: Product[];
  operations: Operation[];
  productsPageNumber: number;
  productsTotal: number;
  operationsPageNumber: number;
  operationsTotal: number;
  error: string | null;
};

const initialState: ItemsState = {
  loadItemsStatus: THUNK_STATUSES.DEFAULT,
  products: [],
  operations: [],
  productsPageNumber: 0,
  productsTotal: 0,
  operationsPageNumber: 0,
  operationsTotal: 0,
  error: null,
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    // setProducts: (state, action: PayloadAction<Product[]>) => {
    //   state.products = action.payload;
    // },
    // setOperations: (state, action: PayloadAction<Operation[]>) => {
    //   state.operations = action.payload;
    // },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    addOperation: (state, action: PayloadAction<Operation>) => {
      state.operations.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    updateOperation: (state, action: PayloadAction<Operation>) => {
      const index = state.operations.findIndex((o) => o.id === action.payload.id);
      if (index !== -1) {
        state.operations[index] = action.payload;
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
      })
      .addCase(loadOperations.pending, (state) => {
        state.loadItemsStatus = THUNK_STATUSES.PENDING;
      })
      .addCase(loadOperations.fulfilled, (state, { payload }) => {
        const { data, pagination } = payload;
        if (pagination.pageNumber === 1) {
          state.operations = data;
        } else {
          state.operations.push(...data);
        }
        state.operationsPageNumber = pagination.pageNumber;
        state.operationsTotal = pagination.total;
        state.loadItemsStatus = THUNK_STATUSES.FULFILLED;
      })
      .addCase(loadOperations.rejected, (state) => {
        state.loadItemsStatus = THUNK_STATUSES.REJECTED;
      });
  },
});

export const {
  // setProducts, setOperations,
  addProduct,
  updateProduct,
  addOperation,
  updateOperation,
} = itemsSlice.actions;
export default itemsSlice.reducer;

const selectItemsState = (state: RootState) => state.items;

export const selectloadItemsStatus = (state: RootState) => selectItemsState(state).loadItemsStatus;

export const selectProducts = createSelector([selectItemsState], (itemsState) => itemsState.products);

export const selectProductsPagination = createSelector([selectItemsState], (itemsState) => ({
  pageNumber: itemsState.productsPageNumber,
  total: itemsState.productsTotal,
}));

export const selectOperations = createSelector([selectItemsState], (itemsState) => itemsState.operations);

export const selectOperationsPagination = createSelector([selectItemsState], (itemsState) => ({
  pageNumber: itemsState.operationsPageNumber,
  total: itemsState.operationsTotal,
}));

export const loadProducts = createAsyncThunk<LoadProductsSuccessResponse, LoadPageArg, { rejectValue: ApiError[] }>(
  'items/loadProducts',
  async ({ pageNumber, pageSize = PAGE_SIZE }, { rejectWithValue }) => {
    const url = `${API_BASE_URL}${API.PRODUCTS}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    const response = await fetch(url);
    const result = await response.json();

    if (result.errors) {
      return rejectWithValue(result.errors as ApiError[]);
    }
    return result;
  }
);

export const loadOperations = createAsyncThunk<LoadOperationsSuccessResponse, LoadPageArg, { rejectValue: ApiError[] }>(
  'items/loadOperations',
  async ({ pageNumber, pageSize = PAGE_SIZE }, { rejectWithValue }) => {
    const url = `${API_BASE_URL}${API.OPERATIONS}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    const response = await fetch(url);
    const result = await response.json();

    if (result.errors) {
      return rejectWithValue(result.errors as ApiError[]);
    }
    return result;
  }
);

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

export const addNewOperation = createAsyncThunk<Operation, NewOperation, { rejectValue: ApiError[] }>(
  'items/addNewOperation',
  async (data, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN_STORAGE_KEY);

    const response = await fetch(`${API_BASE_URL}${API.OPERATIONS}`, {
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

    dispatch(addOperation(result));
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

export const editOperation = createAsyncThunk<
  Operation,
  { id: string; data: NewOperation },
  { rejectValue: ApiError[] }
>('items/editOperation', async ({ id, data }, { dispatch, rejectWithValue }) => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN_STORAGE_KEY);

  const response = await fetch(`${API_BASE_URL}${API.OPERATIONS}/${id}`, {
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

  dispatch(updateOperation(result));
});
