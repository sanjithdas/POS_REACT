// features/cart/cartSlice.js
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

// Create an entity adapter for the cart
const cartAdapter = createEntityAdapter({
  selectId: (product) => product.id,
});

// Create the initial state using the adapter's getInitialState method
const initialState = cartAdapter.getInitialState();

// Create the cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.entities[action.payload.id];
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cartAdapter.addOne(state, { ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: cartAdapter.removeOne,
    updateQuantity: (state, action) => {
      const product = state.entities[action.payload.id];
      if (product) {
        product.quantity = action.payload.quantity;
      }
    },
    clearCart: () => cartAdapter.getInitialState(),
  },
});

// Export the actions
export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

// Export the selectors generated by the entity adapter
export const {
  selectAll: selectAllCartItems,
  selectById: selectCartItemById,
//  selectIds: selectCartItemIds,
} = cartAdapter.getSelectors((state) => state.cart);

// Export the reducer
export default cartSlice.reducer;