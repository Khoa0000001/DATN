/* eslint-disable @typescript-eslint/no-explicit-any */
  import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

const initialState: any = {
  carts: [],
  cartPosition: null,
  shippingInfo: null, // 👈 thêm trường mới
  loading: false,
  error: null,
};

export const createQR = createAsyncThunk(
  "carts/createQR",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/hook-pay/creat-QR`, data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Fetch categories failed"
      );
    }
  }
);

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    deleteAllData: (state) => {
      state.carts = [];
      state.cartPosition = null;
      state.loading = false;
      state.error = null;
      state.shippingInfo = null;
      localStorage.removeItem("persist:carts");
    },
    setShippingInfo: (state, action: PayloadAction<any>) => {
      state.shippingInfo = action.payload;
    },
    setCartPosition(state, action: PayloadAction<{ x: number; y: number }>) {
      state.cartPosition = action.payload;
    },
    addItem: (state, action: PayloadAction<any>) => {
      const existingItem = state.carts.find(
        (item: any) => item.id === action.payload.id
      );

      if (existingItem) {
        // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
        if (existingItem.quantityCart < existingItem.quantity)
          existingItem.quantityCart += 1;
      } else {
        // Nếu sản phẩm chưa có trong giỏ hàng, thêm vào giỏ hàng
        state.carts.push({ ...action.payload, quantityCart: 1 });
      }
    },
    removeItem: (state, action: PayloadAction<any>) => {
      const existingItem = state.carts.find(
        (item: any) => item.id === action.payload.id
      );

      if (existingItem) {
        state.carts = state.carts.filter(
          (item: any) => item.id !== action.payload.id
        );
      }
    },
    increaseQuantity: (state, action: PayloadAction<any>) => {
      const item = state.carts.find(
        (item: any) => item.id === action.payload.id
      );
      console.log("item", item);
      if (item && item.quantityCart < item.quantity) {
        item.quantityCart += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<any>) => {
      const item = state.carts.find(
        (item: any) => item.id === action.payload.id
      );
      if (item && item.quantityCart > 1) {
        item.quantityCart -= 1;
      }
    },
  },
});

// Selector tính tổng số lượng sản phẩm
export const getTotalQuantity = (state: any) => {
  return state.carts.carts.reduce(
    (total: number, item: any) => total + item.quantityCart,
    0
  );
};
export const getTotalPrice = (state: any) => {
  return state.carts.carts.reduce(
    (total: number, item: any) => total + item.price * item.quantityCart,
    0
  );
};

export const {
  deleteAllData,
  setShippingInfo,
  setCartPosition,
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
