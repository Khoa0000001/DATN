/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

const initialState: any = {
  chatHistory: [],
  meta: {},
  loading: false,
  error: null,
};

export const fetchChatHistory = createAsyncThunk(
  "chatHistorys/fetchChatHistory",
  async (
    data: { userId: string; page?: number; limit?: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(`/chat-history/${data.userId}`, {
        params: {
          page: data.page,
          limit: data.limit,
        },
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Fetch chat-history failed"
      );
    }
  }
);
export const chatBotQuestion = createAsyncThunk(
  "chatHistorys/chatBotQuestion",
  async (
    data: {
      q: string;
      userId?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(`/chatbot`, {
        params: data,
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || "chatbot failed");
    }
  }
);

const chatbotSlice = createSlice({
  name: "chatbot",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.chatHistory = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(fetchChatHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // chatbot question
    builder
      .addCase(chatBotQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(chatBotQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.chatHistory = [
          ...state.chatHistory,
          { question: action.payload.question, answer: action.payload.answer },
        ]; // Thêm câu hỏi và câu trả lời vào chatHistory
      })
      .addCase(chatBotQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default chatbotSlice.reducer;
