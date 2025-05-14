/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

const initialState: any = {
  categories: [],
  products: [],
  productByCategoryId: [],
  listProductFlSale: [],
  meta: {},
  product: {},
  loading: false,
  error: null,
};

export const fetchGroupedByCategory = createAsyncThunk(
  "products/fetchGroupedByCategory",
  async (__dirname, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/products/grouped-by-category`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Fetch products failed"
      );
    }
  }
);

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (
    credentials: { page?: number; limit?: number; search?: string },
    { rejectWithValue }
  ) => {
    try {
      const params = {
        ...credentials,
        exit: true, // always set exit to true
      };
      const response = await axiosInstance.get(`/products`, {
        params,
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Fetch products failed"
      );
    }
  }
);

export const fetchProductsFlSale = createAsyncThunk(
  "products/fetchProductsFlSale",
  async (
    credentials: {
      page?: number;
      limit?: number;
      search?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const params = {
        ...credentials,
        exit: true, // always set exit to true
      };
      const response = await axiosInstance.get(`/products`, {
        params,
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
  async (id: string, { rejectWithValue }) => {
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
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (data: any, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append("nameProduct", data.nameProduct);
      formData.append("price", String(data.price));
      formData.append("categoryId", data.categoryId);
      formData.append("description", data.description || "");

      // Append ảnh
      data.productImages.forEach((file: File) => {
        formData.append("productImages", file);
      });

      // Append thuộc tính dạng JSON
      formData.append("attributeValues", JSON.stringify(data.attributeValues));

      const response = await axiosInstance.post(`/products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Tạo sản phẩm thất bại"
      );
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (data: any, { rejectWithValue }) => {
    try {
      const { id, ...rest } = data;
      const formData = new FormData();

      formData.append("nameProduct", rest.nameProduct);
      formData.append("price", String(rest.price));
      formData.append("categoryId", rest.categoryId);
      formData.append("description", rest.description || "");

      // Append ảnh
      rest.productImages.forEach((file: File) => {
        formData.append("productImages", file);
      });

      // Append thuộc tính dạng JSON
      formData.append("attributeValues", JSON.stringify(rest.attributeValues));
      formData.append(
        "keepProductImages",
        JSON.stringify(rest.keepProductImages)
      );
      const response = await axiosInstance.patch(`/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Cập nhật vai trò thất bại"
      );
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (ids: string[], { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/products`, {
        data: { ids },
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Cập nhật sản phẩm thất bại"
      );
    }
  }
);
export const fetchAttributeByCategoryId = createAsyncThunk(
  "attributes/fetchAttributeByCategoryId",
  async (CategoryId: string, { rejectWithValue }) => {
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

export const fetchProductByCategoryId = createAsyncThunk(
  "products/fetchProductByCategoryId",
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

const userSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsFlSale.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsFlSale.fulfilled, (state, action) => {
        state.loading = false;
        state.listProductFlSale = action.payload.data;
      })
      .addCase(fetchProductsFlSale.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(fetchProductByCategoryId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductByCategoryId.fulfilled, (state, action) => {
        state.loading = false;
        state.productByCategoryId = action.payload.data;
      })
      .addCase(fetchProductByCategoryId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(fetchGroupedByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroupedByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data;
      })
      .addCase(fetchGroupedByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
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
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // update
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // delete
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
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
