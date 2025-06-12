import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

type TIngredientsState = {
  data: Array<TIngredient>;
  loading: boolean;
  error: string | null;
};

export const getIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => await getIngredientsApi()
);

const initialState: TIngredientsState = {
  data: [],
  loading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ? action.error.message : 'error';
      })
      .addCase(
        getIngredients.fulfilled,
        (state, action: PayloadAction<Array<TIngredient>>) => {
          state.loading = false;
          state.data = action.payload;
        }
      );
  }
});
