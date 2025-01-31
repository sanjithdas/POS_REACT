import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

// Async action to generate barcode
export const generateBarcode = createAsyncThunk(
  'barcodePayment/generateBarcode',
  async ({ orderId, amount }, { rejectWithValue }) => {
    try {
       console.log(orderId); 
      const response = await axios.post('/generate-barcode', { orderId, amount });
      return response.data; // Assuming response contains the barcode HTML
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Error generating barcode');
    }
  }
);

// Async action to update payment status
export const updatePaymentStatus = createAsyncThunk(
  'barcodePayment/updatePaymentStatus',
  async ({ orderId, amount, status }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/barcode-payment', {
        orderId,
        amount,
        status, // "Paid" or other statuses
      });
      return response.data; // Assuming success response
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Error updating payment');
    }
  }
);

const barcodePaymentSlice = createSlice({
  name: 'barcodePayment',
  initialState: {
    barcode: null,
    loading: false,
    error: null,
    paymentStatus: null, // Holds the status of the payment update
  },
  reducers: {
    resetBarcode: (state) => {
      state.barcode = null;
      state.paymentStatus = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Generate Barcode
      .addCase(generateBarcode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateBarcode.fulfilled, (state, action) => {
        state.loading = false;
        state.barcode = action.payload.barcode; // Assuming `barcode` is returned in the payload
      })
      .addCase(generateBarcode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to generate barcode.';
      })
      // Update Payment Status
      .addCase(updatePaymentStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePaymentStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentStatus = 'Payment Successful';
      })
      .addCase(updatePaymentStatus.rejected, (state, action) => {
        state.loading = false;
        state.paymentStatus = 'Payment Failed';
        state.error = action.payload || 'Failed to update payment status.';
      });
  },
});

export const { resetBarcode } = barcodePaymentSlice.actions;

export const selectBarcode = (state) => state.barcodePayment.barcode;
export const selectLoading = (state) => state.barcodePayment.loading;
export const selectError = (state) => state.barcodePayment.error;
export const selectPaymentStatus = (state) => state.barcodePayment.paymentStatus;

export default barcodePaymentSlice.reducer;
