import { THUNK_STATUSES, ThunkStatus } from 'src/store/store-consts';
import { Category, LoadCategoriesSuccessResponse } from 'src/entities/categories/categories-consts';
import { RootState } from 'src/store/store';
import { createAsyncThunk, createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { API, API_BASE_URL, ApiError, COMMAND_ID, LOCAL_STORAGE_KEYS } from 'src/shared/lib/common-consts';
import { Product } from 'src/entities/product/items-consts';

type CategoriesState = {
  loadCategoriesStatus: ThunkStatus;
  categories: Category[];
  categoryIds: Array<string>;
};

const initialState: CategoriesState = {
  loadCategoriesStatus: THUNK_STATUSES.DEFAULT,
  categories: [],
  categoryIds: [],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
      state.categoryIds.push(action.payload.id);
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      const index = state.categories.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCategories.pending, (state) => {
        state.loadCategoriesStatus = THUNK_STATUSES.PENDING;
      })
      .addCase(loadCategories.fulfilled, (state, { payload }) => {
        const { data } = payload;
        const projectCategories = data.filter((item) => item.commandId === COMMAND_ID);

        state.categories = projectCategories;
        state.categoryIds = projectCategories.map((item) => item.id);

        state.loadCategoriesStatus = THUNK_STATUSES.FULFILLED;
      })
      .addCase(loadCategories.rejected, (state) => {
        state.loadCategoriesStatus = THUNK_STATUSES.REJECTED;
      });
  },
});
export const { addCategory, updateCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;

const selectCategoriesState = (state: RootState) => state.categories;

export const selectloadCategoriesStatus = createSelector(
  [selectCategoriesState],
  (categoriesState) => categoriesState.loadCategoriesStatus
);

export const selectCategories = createSelector(
  [selectCategoriesState],
  (categoriesState) => categoriesState.categories
);

export const selectCategoryIds = createSelector(
  [selectCategoriesState],
  (categoriesState) => categoriesState.categoryIds
);

export const selectCategoryById = (state: RootState, id?: string) =>
  state.categories.categories.find((category) => category.id === id);

export const loadCategories = createAsyncThunk<LoadCategoriesSuccessResponse, null, { rejectValue: ApiError[] }>(
  'categories/loadCategories',
  async (_, { rejectWithValue }) => {
    const url = `${API_BASE_URL}${API.CATEGORIES}`;
    const response = await fetch(url);
    const result = await response.json();

    if (result.errors) {
      return rejectWithValue(result.errors as ApiError[]);
    }
    return result;
  }
);

export const addNewCategory = createAsyncThunk<
  Category,
  {
    name: string;
    photo?: string;
  },
  { rejectValue: ApiError[] }
>('categories/addNewCategory', async (data, { dispatch, rejectWithValue }) => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN_STORAGE_KEY);

  const response = await fetch(`${API_BASE_URL}${API.CATEGORIES}`, {
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

  dispatch(addCategory(result));
});

export const editCategory = createAsyncThunk<Category, { id: string; data: Category }, { rejectValue: ApiError[] }>(
  'categories/editCategory',
  async ({ id, data }, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN_STORAGE_KEY);

    const response = await fetch(`${API_BASE_URL}${API.CATEGORIES}/${id}`, {
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

    dispatch(updateCategory(result));
  }
);
