import { configureStore} from '@reduxjs/toolkit';
import productReducer from '../src/features/product/ProductSlice'; // Adjust the import path as per your project structure
import cartReducer from '../src/features/cart/CartSlice'
import orderReducer from '../src/features/order/OrderSlice'
import BarcodePaymentReducer from '../src/features/payment/BarcodePaymentSlice'
import authReducer from './features/login/AuthSlice'
import registerReducer from './features/register/RegisterSlice'
const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer, 
    order: orderReducer,
    barcodePayment: BarcodePaymentReducer,
    auth: authReducer,
    register: registerReducer

  },
});

export default store;
