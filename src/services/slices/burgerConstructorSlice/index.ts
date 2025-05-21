import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setBun: (state, action: PayloadAction<TIngredient | null>) => {
      state.bun = action.payload;
    },

    addIngredient: {
      prepare: (payload: TIngredient) => ({
        payload: { ...payload, id: payload._id }
      }),
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      }
    },

    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const selectedIngredient: TConstructorIngredient =
        state.ingredients[action.payload];
      state.ingredients[action.payload] = state.ingredients[action.payload - 1];
      state.ingredients[action.payload - 1] = selectedIngredient;
    },

    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const selectedIngredient: TConstructorIngredient =
        state.ingredients[action.payload];
      state.ingredients[action.payload] = state.ingredients[action.payload + 1];
      state.ingredients[action.payload + 1] = selectedIngredient;
    },

    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },

    resetConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  setBun,
  addIngredient,
  moveIngredientUp,
  moveIngredientDown,
  removeIngredient,
  resetConstructor
} = burgerConstructorSlice.actions;
