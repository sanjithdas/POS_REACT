import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios"; // Adjust path based on your project structure

// Async action for user registration
export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/register", userData); // Adjust the endpoint to match your backend API
      return response.data; // Return the user data on success
    } catch (error) {
      // Reject with error message
      return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
  success: false,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    resetRegistrationState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

// Actions
export const { resetRegistrationState } = registerSlice.actions;

// Selectors
export const selectRegisterLoading = (state) => state.register.loading;
export const selectRegisterError = (state) => state.register.error;
export const selectRegisterSuccess = (state) => state.register.success;

// Reducer
export default registerSlice.reducer;
