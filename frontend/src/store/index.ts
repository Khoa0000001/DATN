// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { injectStore } from "@/utils/axiosInstance";
import authReducer from "@/store/slice/authSlice";
import categoryReducer from "@/store/slice/categorySlice";
import productReducer from "@/store/slice/productSlice";
import cartReducer from "@/store/slice/cartSlice";

const persistConfig = {
  key: "auth",
  storage,
};

const rootReducer = {
  auth: persistReducer(persistConfig, authReducer),
  categories: categoryReducer,
  products: productReducer,
  carts: cartReducer,
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
