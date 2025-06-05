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

export const buildPcByChatbot = createAsyncThunk(
  "buildPc/buildPcByChatbot",
  async (
    params: { price: number; purpose: string; categoryIds: any[] },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(`/chatbot/build-pc`, {
        params: {
          budget: params.price,
          purpose: params.purpose,
          categoryIds: params.categoryIds.map((item) => item.id).join(","),
        },
        timeout: 0,
      });
      const dataBuildPC = response.data?.data.answer;
      const kq = params.categoryIds?.map((item: any) => {
        const found = dataBuildPC.find((p: any) => p.categoryId === item.id);
        if (found) {
          return {
            categoryId: item.id,
            productId: found.productId,
            nameCategory: item.nameCategory,
            nameProduct: found.nameProduct,
            price: found.price,
            productImages: found.productImages || [],
          };
        } else {
          return {
            categoryId: item.id,
            productId: null,
            nameCategory: item.nameCategory,
            nameProduct: null,
            price: 0,
            productImages: [],
          };
        }
      });
      return kq || [];
    } catch (err: any) {
      console.error("Error in buildPcByChatbot:", err);
      return rejectWithValue(err?.response?.data?.message || "Build PC failed");
    }
  }
);

const initialState: any = {
  computer_components: [],
  dataProductBuildPC: [],
  dataAiProductBuildPC: [],
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
    setValueComponents: (state, action) => {
      const updates = action.payload as { id: string; newValue: any }[];
      updates
        .filter((item) => item.newValue.id)
        .forEach(({ id, newValue }) => {
          const component = state.computer_components.find(
            (component: any) => component.id === id
          );
          if (component) {
            component.value = newValue;
          }
        });
    },
    resetdataAiProductBuildPC: (state) => {
      state.dataAiProductBuildPC = [];
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
    builder
      // get ai build pc
      .addCase(buildPcByChatbot.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(buildPcByChatbot.fulfilled, (state, action) => {
        state.loading = false;
        state.dataAiProductBuildPC = action.payload;
      })
      .addCase(buildPcByChatbot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setComputerComponents,
  setValueComponent,
  resetAllComponent,
  setValueComponents,
  resetdataAiProductBuildPC,
} = buildPcSlice.actions;

export default buildPcSlice.reducer;
