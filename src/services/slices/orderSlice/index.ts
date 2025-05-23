import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getOrders = createAsyncThunk(
  'order/getOrders',
  async () => await getOrdersApi()
);

export const getAnOrder = createAsyncThunk(
  'order/getAnOrder',
  async (data: number, { rejectWithValue }) => {
    const response = await getOrderByNumberApi(data);

    if (response?.success) {
      return response.orders[0];
    }

    return rejectWithValue(response);
  }
);

export const sendOrder = createAsyncThunk(
  'order/sendOrder',
  async (data: string[], { rejectWithValue }) => {
    const response = await orderBurgerApi(data);

    if (response?.success) {
      return { order: response.order, name: response.name };
    }

    return rejectWithValue(response);
  }
);

type TOrderState = {
  ordersLoading: boolean;
  anOrderLoading: boolean;
  orderRequest: boolean;
  modalData: TOrder | null;
  error: string | null;
  data: TOrder[];
};

const initialState: TOrderState = {
  ordersLoading: false,
  anOrderLoading: false,
  orderRequest: false,
  modalData: null,
  error: null,
  data: []
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrderModalData: (state) => {
      state.modalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.ordersLoading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.ordersLoading = false;
        state.data = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.ordersLoading = false;
        state.error = action.error.message ? action.error.message : 'error';
      })
      .addCase(getAnOrder.pending, (state) => {
        state.anOrderLoading = true;
        state.error = null;
      })
      .addCase(getAnOrder.fulfilled, (state, action) => {
        state.anOrderLoading = false;
        state.modalData = action.payload;
      })
      .addCase(getAnOrder.rejected, (state, action) => {
        state.anOrderLoading = false;
        state.error = action.error.message ? action.error.message : 'error';
      })
      .addCase(sendOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.modalData = action.payload.order;
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message ? action.error.message : 'error';
      });
  }
});

export const { resetOrderModalData } = orderSlice.actions;
