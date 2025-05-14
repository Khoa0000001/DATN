/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

const initialState: any = {
  orders: [],
  meta: {},
  order: {},
  loading: false,
  error: null,
};

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (
    credentials: { page?: number; limit?: number; search?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(`/orders`, {
        params: credentials,
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Fetch orders failed"
      );
    }
  }
);
export const fetchOrderDetail = createAsyncThunk(
  "orders/fetchOrderDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/orders/${id}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Fetch orders failed"
      );
    }
  }
);

export const updateOrders = createAsyncThunk(
  "orders/updateOrders",
  async (data: any, { rejectWithValue }) => {
    try {
      delete data.createDate;
      delete data.updateDate;
      const { id, ...rest } = data;
      const response = await axiosInstance.patch(`/orders/${id}`, rest);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Cập nhật vai trò thất bại"
      );
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(fetchOrderDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.data;
      })
      .addCase(fetchOrderDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(updateOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrders.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
