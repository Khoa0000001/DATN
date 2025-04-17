import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  accessToken: string | null;
  userInfo: {
    nameUser: string;
    email: string;
    phone: string;
    address: string;
    profilePicture: string;
  } | null;
  roles: string[];
  permissions: string[];
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  userInfo: null,
  roles: [],
  permissions: [],
  loading: false,
  error: null,
};

// Tạo async thunk để call API login và lấy dữ liệu
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/auth/login`, // Đường dẫn API đăng nhập
        credentials
      );
      return response.data.data; // Dữ liệu trả về từ API
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || "Login failed");
    }
  }
);
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    credentials: { email: string; password: string; nameUser: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/auth/register`, // Đường dẫn API đăng nhập
        credentials
      );
      return response.data.data; // Dữ liệu trả về từ API
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || "Register failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.userInfo = null;
      state.roles = [];
      state.permissions = [];
      state.error = null;
      localStorage.removeItem("persist:root"); // Xóa dữ liệu redux-persist
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { access_token, user_info, roles, permissions } = action.payload;
        state.accessToken = access_token;
        state.userInfo = user_info;
        state.roles = roles || [];
        state.permissions = permissions || [];
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
