import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios'; 

// Create an entity adapter for the order
const orderAdapter = createEntityAdapter({
  selectId: (order) => order.id,
});

// Create an async thunk for creating an order
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData) => {
    try {
      const response = await axios.post('/orders', orderData); // Send orderData in POST request
      if (response.data && response.data.id) { // Check for a valid response
        return response.data; // Return the created order data
      } else {
        console.error('Invalid response data:', response.data);
        throw new Error('Invalid response data');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      throw error; // Rethrow the error to be caught by the component
    }
  }
);

// Create the initial state using the adapter's getInitialState method
const initialState = orderAdapter.getInitialState();

// Create the order slice
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.fulfilled, (state, action) => {
        orderAdapter.addOne(state, action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        console.error('Failed to create order:', action.error.message);
      });
  }
});

// Export the selectors generated by the entity adapter
export const {
  selectAll: selectAllOrders,
  selectById: selectOrderById,
  selectIds: selectOrderIds,
} = orderAdapter.getSelectors((state) => state.order);

// Export the reducer
export default orderSlice.reducer;