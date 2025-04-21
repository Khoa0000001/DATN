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
export const fetchRoleDetail = createAsyncThunk(
  "roles/fetchRoleDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/roles/${id}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Fetch roles failed"
      );
    }
  }
);
export const createRole = createAsyncThunk(
  "roles/createRole",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/roles`, data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Fetch roles failed"
      );
    }
  }
);

export const updateRole = createAsyncThunk(
  "roles/updateRole",
  async (data: any, { rejectWithValue }) => {
    try {
      delete data.createDate;
      delete data.updateDate;
      const { id, ...rest } = data;
      const response = await axiosInstance.patch(`/roles/${id}`, rest);
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
      // get detail role
      .addCase(fetchRoleDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoleDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.role = action.payload.data;
      })
      .addCase(fetchRoleDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // add role
      .addCase(createRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRole.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // update role
      .addCase(updateRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRole.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateRole.rejected, (state, action) => {
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
