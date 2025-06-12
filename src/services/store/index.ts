import { configureStore, combineSlices } from '@reduxjs/toolkit';

import { composeWithDevTools } from '@reduxjs/toolkit/dist/devtoolsExtension';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import {
  ingredientsSlice,
  burgerConstructorSlice,
  feedSlice,
  userSlice,
  orderSlice
} from '@slices';

import { middlewareOrder } from '../middlewares';

export const rootReducer = combineSlices(
  ingredientsSlice,
  burgerConstructorSlice,
  feedSlice,
  userSlice,
  orderSlice
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewareOrder),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
