/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

const initialState: any = {
  products: [],
  meta: {},
  product: {},
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (
    credentials: { page?: number; limit?: number; search?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(`/products`, {
        params: credentials,
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Fetch products failed"
      );
    }
  }
);
export const fetchProductDetail = createAsyncThunk(
  "products/fetchProductDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/products/${id}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Fetch products failed"
      );
    }
  }
);
export const createCategory = createAsyncThunk(
  "products/createCategory",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/categories`, data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Fetch categories failed"
      );
    }
  }
);

export const updateCategory = createAsyncThunk(
  "products/updateCategory",
  async (data: any, { rejectWithValue }) => {
    try {
      delete data.createDate;
      delete data.updateDate;
      const { id, ...rest } = data;
      const response = await axiosInstance.patch(`/categories/${id}`, rest);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Cập nhật vai trò thất bại"
      );
    }
  }
);
export const deleteCategory = createAsyncThunk(
  "products/deleteCategory",
  async (ids: string[], { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/categories`, {
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
export const fetchAttributeByCategoryId = createAsyncThunk(
  "attributes/fetchAttributeByCategoryId",
  async (CategoryId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/attributes/getList-attribute-by-categoryId/${CategoryId}`
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Fetch AttributeByCategoryId failed"
      );
    }
  }
);

const userSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // get detail
      .addCase(fetchProductDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.data;
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // add
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // update
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // delete
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchAttributeByCategoryId
      .addCase(fetchAttributeByCategoryId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttributeByCategoryId.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchAttributeByCategoryId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
