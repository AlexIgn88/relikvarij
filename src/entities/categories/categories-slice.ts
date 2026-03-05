import { THUNK_STATUSES, ThunkStatus } from 'src/store/store-consts';
import { Category, LoadCategoriesSuccessResponse } from 'src/entities/categories/categories-consts';
import { RootState } from 'src/store/store';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { API, API_BASE_URL, ApiError, COMMAND_ID } from 'src/common/common-consts';

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
  reducers: {},
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
