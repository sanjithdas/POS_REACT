import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from '../../api/axios'; // Adjust import path as per your project structure

const productsAdapter = createEntityAdapter({
  selectId: product => product.id,
});

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts', // Action type prefix
    async () => {
      try {
        const response = await axios.get('/products'); // Adjust URL based on your backend
        if (response.data && Array.isArray(response.data.data)) {
          return response.data.data.filter(product => product && product.id); // Filter out invalid data
        } else {
          console.error('Invalid response data:', response.data);
          throw new Error('Invalid response data');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error; // Rethrow the error to be caught by the component
      }
    }
  );

const initialState = productsAdapter.getInitialState({
  loading: false,
  error: null,
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Reducer to add a single product to the state
    productAdded: productsAdapter.addOne,
    
    // Reducer to update a product in the state
    productUpdated: productsAdapter.updateOne,
    
    // Reducer to remove a product from the state
    productRemoved: productsAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        productsAdapter.setAll(state, action.payload); // Update entities in state
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        console.log("dfsdfd")
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const { productAdded, productUpdated, productRemoved } = productSlice.actions;

export const { selectAll: selectAllProducts } = productsAdapter.getSelectors(state => state.products);

export default productSlice.reducer;
