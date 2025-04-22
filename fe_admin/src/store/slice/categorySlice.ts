/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

const initialState: any = {
  categories: [],
  meta: {},
  category: {},
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "roles/fetchCategories",
  async (
    credentials: { page?: number; limit?: number; search?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(`/categories`, {
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
export const fetchCategoryDetail = createAsyncThunk(
  "roles/fetchCategoryDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/categories/${id}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Fetch roles failed"
      );
    }
  }
);
export const createCategory = createAsyncThunk(
  "roles/createCategory",
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
  "roles/updateCategory",
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
export const deleteRole = createAsyncThunk(
  "roles/deleteRole",
  async (ids: string[], { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/roles`, { data: { ids } });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Cập nhật vai trò thất bại"
      );
    }
  }
);

const userSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // get detail
      .addCase(fetchCategoryDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload.data;
      })
      .addCase(fetchCategoryDetail.rejected, (state, action) => {
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
      // delete role
      .addCase(deleteRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRole.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
