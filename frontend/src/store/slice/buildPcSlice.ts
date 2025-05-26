/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk(
  "buildPc/fetchCategories",
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

export const fetchProductByCategoryId = createAsyncThunk(
  "buildPc/fetchProductByCategoryId",
  async (CategoryId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/products`, {
        params: {
          categoryId: CategoryId,
          exit: true,
        },
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Fetch ProductByCategoryId failed"
      );
    }
  }
);

const initialState: any = {
  computer_components: [],
  dataBuildPC: {},
  dataProductBuildPC: [],
  loading: false,
  error: null,
};

const buildPcSlice = createSlice({
  name: "buildPc",
  initialState,
  reducers: {
    setComputerComponents: (state, action) => {
      state.computer_components = action.payload;
    },
    setValueComponent: (state, action) => {
      const { id, newValue } = action.payload;
      const component = state.computer_components.find(
        (component: any) => component.id === id
      );
      if (component) {
        component.value = newValue;
      }
    },
    resetAllComponent: (state) => {
      state.computer_components = state.computer_components.map(
        (component: any) => {
          return { ...component, value: null };
        }
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.computer_components = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      // get detail
      .addCase(fetchProductByCategoryId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductByCategoryId.fulfilled, (state, action) => {
        state.loading = false;
        state.dataProductBuildPC = action.payload.data;
      })
      .addCase(fetchProductByCategoryId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setComputerComponents, setValueComponent, resetAllComponent } =
  buildPcSlice.actions;

export default buildPcSlice.reducer;
