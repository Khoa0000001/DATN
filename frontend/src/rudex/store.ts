import { configureStore } from "@reduxjs/toolkit";
import DataBuildPCSliceReducer from "./DataBuildPCSlice";

export const store = configureStore({
  reducer: {
    DataBuildPC: DataBuildPCSliceReducer,
  },
});

// Lấy kiểu RootState và AppDispatch từ store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
