import { configureStore} from '@reduxjs/toolkit';
import productReducer from '../src/features/product/ProductSlice'; // Adjust the import path as per your project structure
import cartReducer from '../src/features/cart/CartSlice'
import orderReducer from '../src/features/order/OrderSlice'
const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer, 
    order: orderReducer
  },
});

export default store;
