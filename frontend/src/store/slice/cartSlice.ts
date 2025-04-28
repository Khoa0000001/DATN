/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  carts: [],
  cartPosition: null,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    setCartPosition(state, action: PayloadAction<{ x: number; y: number }>) {
      state.cartPosition = action.payload;
    },
    addItem: (state, action: PayloadAction<any>) => {
      const existingItem = state.carts.find(
        (item: any) => item.id === action.payload.id
      );

      if (existingItem) {
        // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
        existingItem.quantity += 1;
      } else {
        // Nếu sản phẩm chưa có trong giỏ hàng, thêm vào giỏ hàng
        state.carts.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action: PayloadAction<any>) => {
      const existingItem = state.carts.find(
        (item: any) => item.id === action.payload.id
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          // Nếu số lượng > 1, giảm số lượng
          existingItem.quantity -= 1;
          
        } else {
          // Nếu số lượng = 1, xóa sản phẩm khỏi giỏ hàng
          state.carts = state.carts.filter(
            (item: any) => item.id !== action.payload.id
          );
        }
      }
    },
    increaseQuantity: (state, action: PayloadAction<any>) => {
      const item = state.carts.find(
        (item: any) => item.id === action.payload.id
      );
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<any>) => {
      const item = state.carts.find(
        (item: any) => item.id === action.payload.id
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

// Selector tính tổng số lượng sản phẩm
export const getTotalQuantity = (state: any) => {
  return state.carts.carts.reduce(
    (total: number, item: any) => total + item.quantity,
    0
  );
};
export const getTotalPrice = (state: any) => {
  return state.carts.carts.reduce(
    (total: number, item: any) => total + item.price * item.quantity,
    0
  );
};

export const {
  setCartPosition,
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
