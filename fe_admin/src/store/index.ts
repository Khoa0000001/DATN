// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { injectStore } from "@/utils/axiosInstance";
import authReducer from "@/store/slice/authSlice";
import userReducer from "@/store/slice/userSlice";
import roleReducer from "@/store/slice/roleSlice";
import permissionReducer from "@/store/slice/permissionSlice";

const persistConfig = {
  key: "auth",
  storage,
};

const rootReducer = {
  auth: persistReducer(persistConfig, authReducer),
  users: userReducer,
  roles: roleReducer,
  permissions: permissionReducer,
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
