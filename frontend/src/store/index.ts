// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { injectStore } from "@/utils/axiosInstance";
import authReducer from "@/store/slice/authSlice";
import categoryReducer from "@/store/slice/categorySlice";
import productReducer from "@/store/slice/productSlice";
import cartReducer from "@/store/slice/cartSlice";
import chatReducer from "@/store/slice/chatbotSlice";
import orderReducer from "@/store/slice/orderSlice";

const persistConfig = {
  key: "auth",
  storage,
};

const cartPersistConfig = {
  key: "carts",
  storage,
};

const rootReducer = {
  auth: persistReducer(persistConfig, authReducer),
  categories: categoryReducer,
  products: productReducer,
  carts: persistReducer(cartPersistConfig, cartReducer),
  chatbots: chatReducer,
  orders: orderReducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

injectStore(store); // ✅ Inject store vào axiosInstance

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
