import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios'; // Adjust the path based on your project structure

// Create an async thunk for handling the payment
export const handlePayment = createAsyncThunk(
  'payment/handlePayment',
  async ({ stripeToken, amount , orderId }, { rejectWithValue }) => {
    console.log("object", stripeToken);
    try {
      // Make the API request to your backend payment route
      const response = await axios.post('/payment', {
        stripeToken,
        amount,
        orderId
      });
      console.log(response.data);
      // Assuming your backend responds with a success message
      if (response.data.success) {
        console.log(response.data);
        return response.data;
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Payment error');
    }
  }
);

// Initial state for the PaymentSlice
const initialState = {
  loading: false,
  success: null,
  error: null,
};

// Create the PaymentSlice
const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    resetPaymentState: (state) => {
      state.loading = false;
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handlePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(handlePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
        state.error = null;
      })
      .addCase(handlePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Payment failed';
        state.success = null;
      });
  },
});

// Export the action to reset the payment state
export const { resetPaymentState } = paymentSlice.actions;

// Export selectors
export const selectPaymentLoading = (state) => state.payment.loading;
export const selectPaymentSuccess = (state) => state.payment.success;
export const selectPaymentError = (state) => state.payment.error;

// Export the reducer to be included in the store
export default paymentSlice.reducer;
