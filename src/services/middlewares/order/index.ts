import { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { sendOrder, resetConstructor } from '@slices';

export const middlewareOrder: Middleware =
  (store: MiddlewareAPI) => (next) => (action) => {
    if (sendOrder.fulfilled.match(action)) {
      store.dispatch(resetConstructor());
    }
    next(action);
  };
