import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "../../api/axios"; // Adjust import path as needed

const productsAdapter = createEntityAdapter({
  selectId: (product) => product.id,
});

// Fetch products thunk with optional search query and page
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ searchQuery = "", page = 1 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/products`, {
        params: {
          search: searchQuery,
          page, // Pass the page number to the API
        },
      });
      console.log("first", response);
      // Return products and pagination info
      if (response.data && Array.isArray(response.data.data)) {
        return {
          products: response.data.data,
          pagination: {
            current_page: response.data.current_page,
            last_page: response.data.last_page,
            total: response.data.total,
          },
        };
      } else {
        return rejectWithValue("Invalid response data");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const initialState = productsAdapter.getInitialState({
  loading: false,
  error: null,
  pagination: { current_page: 1, last_page: 1, total: 0 }, // Add pagination info in the state
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productAdded: productsAdapter.addOne,
    productUpdated: productsAdapter.updateOne,
    productRemoved: productsAdapter.removeOne,
    productsCleared: productsAdapter.removeAll, // Clear products when starting new search
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
        productsAdapter.setAll(state, action.payload.products); // Set new products in state
        state.pagination = action.payload.pagination; // Update pagination in state
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        if (action.payload !== "Request aborted") {
          state.error = action.payload || "Failed to fetch products";
        }
      });
  },
});

export const { productAdded, productUpdated, productRemoved, productsCleared } =
  productSlice.actions;

export const { selectAll: selectAllProducts } = productsAdapter.getSelectors(
  (state) => state.products
);
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError = (state) => state.products.error;
export const selectProductsPagination = (state) => state.products.pagination;

export default productSlice.reducer;
