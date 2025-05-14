/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

const initialState: any = {
  suppliers: [],
  meta: {},
  supplier: {},
  loading: false,
  error: null,
};

export const fetchSuppliers = createAsyncThunk(
  "suppliers/fetchSuppliers",
  async (
    credentials: { page?: number; limit?: number; search?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(`/suppliers`, {
        params: credentials,
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Fetch categories failed"
      );
    }
  }
);
export const fetchSupplierDetail = createAsyncThunk(
  "suppliers/fetchSupplierDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/suppliers/${id}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Fetch categories failed"
      );
    }
  }
);
export const createSupplier = createAsyncThunk(
  "categories/createSupplier",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/suppliers`, data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Fetch categories failed"
      );
    }
  }
);

export const updateSuppliery = createAsyncThunk(
  "suppliers/updateSuppliery",
  async (data: any, { rejectWithValue }) => {
    try {
      delete data.createDate;
      delete data.updateDate;
      const { id, ...rest } = data;
      const response = await axiosInstance.patch(`/suppliers/${id}`, rest);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Cập nhật vai trò thất bại"
      );
    }
  }
);
export const deleteSuppliery = createAsyncThunk(
  "suppliers/deleteSuppliery",
  async (ids: string[], { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/suppliers`, {
        data: { ids },
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Cập nhật vai trò thất bại"
      );
    }
  }
);

const userSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuppliers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.loading = false;
        state.suppliers = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // get detail
      .addCase(fetchSupplierDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSupplierDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.supplier = action.payload.data;
      })
      .addCase(fetchSupplierDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // add
      .addCase(createSupplier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSupplier.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createSupplier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // update
      .addCase(updateSuppliery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSuppliery.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateSuppliery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // delete
      .addCase(deleteSuppliery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSuppliery.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteSuppliery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
