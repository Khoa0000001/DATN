/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

const initialState: any = {
  importInvoices: [],
  meta: {},
  importInvoice: {},
  loading: false,
  error: null,
};

export const fetchImportInvoices = createAsyncThunk(
  "importInvoices/fetchImportInvoices",
  async (
    credentials: { page?: number; limit?: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(`/import-invoices`, {
        params: credentials,
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Fetch importInvoices failed"
      );
    }
  }
);

export const fetchImportInvoiceDetail = createAsyncThunk(
  "importInvoices/fetchImportInvoiceDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/import-invoices/${id}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Fetch fetchImportInvoiceDetail failed"
      );
    }
  }
);

export const createImportInvoices = createAsyncThunk(
  "importInvoices/createImportInvoices",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/import-invoices`, data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "create importInvoices failed"
      );
    }
  }
);

const importInvoicesSlice = createSlice({
  name: "importInvoices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImportInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchImportInvoices.fulfilled, (state, action) => {
        state.loading = false;
        state.importInvoices = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(fetchImportInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(fetchImportInvoiceDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchImportInvoiceDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.importInvoice = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(fetchImportInvoiceDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(createImportInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createImportInvoices.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createImportInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default importInvoicesSlice.reducer;
