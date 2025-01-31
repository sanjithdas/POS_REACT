import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllCartItems, updateQuantity, removeFromCart } from '../features/cart/CartSlice';
import { createOrder, updateOrder } from '../features/order/OrderSlice';
import {fetchProducts} from '../features/product/ProductSlice.js'
import Payment from './Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from "react-router-dom";
import { selectAuth } from "../features/login/AuthSlice";

const stripePromise = loadStripe('pk_test_34RmVhfJpvCotGlZ4pdR6e6r005W1VgOH5');

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectAllCartItems);
  const { token } = useSelector(selectAuth);
  const { user } = useSelector(selectAuth);
  console.log("totken is ",token,user); 
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState(null); // Use useState to manage orderId
  const [loading, setLoading] = useState(false); // Use useState for loading status
  const [showPayment, setShowPayment] = useState(false);
  const [isCheckoutDisabled, setIsCheckoutDisabled] = useState(false);
  const [pageLoading, setPageLoading] = useState(true); // Initial loading state
 
  // Simulate loading products
  useEffect(() => {
    // Fetch products and then set loading to false
    dispatch(fetchProducts({page : 1})).then(() => {
      setPageLoading(false); // Set loading to false once products are loaded
    });
  }, [dispatch]);


  const initiatePayment = () => {
    // Here you can render your Payment component or trigger the payment logic
    console.log('Initiating payment process...');
    setShowPayment(true); 
    // Example: You can render the Payment component conditionally
    // or call an external payment gateway API
  };

  // Handle checkout
  const handleCheckout = async () => {

    if (!token || !user) {
      console.log("object");
      navigate("/login"); // Redirect to login
      return;
    }
    const orderData = {
      customerName: user.name,
      customerEmail: user.email,
      products: cart
    };
    
    setLoading(true); // Set loading to true when starting the checkout process
    
    // Stripe payment integrations

    try {
      // If an order ID already exists, update the order
      if (orderId) {
        console.log('Updating order with ID:', orderId);
        const response1 = await dispatch(updateOrder({ ...orderData, id: orderId }));
        console.log('Update response:', response1);
         
      } else {
        // If no order ID exists, create a new order
        const response = await dispatch(createOrder(orderData));
        console.log('Create response:', response);

        // Assuming `response.payload` contains the order details with an order ID
        setOrderId(response.payload.id); // Update the state with the order ID
        console.log('Order ID:', response.payload.id);
      
      }
      initiatePayment();
    } catch (error) {
      console.error('Error creating/updating order:', error);
    } finally {
      setLoading(false); // Set loading to false when the process is complete
    }
  };

  const handlePaymentSuccess = () => {
   // setShowPayment(false); // Close the modal
    setIsCheckoutDisabled(true); // Disable the checkout button
  };

  console.log(isCheckoutDisabled);

  //const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    !pageLoading && (
      <div className="w-1/2 bg-white p-4 shadow-lg">
        <h2 className="text-center font-semibold mb-4 cart-header">CART</h2>
        {cart && cart.map((item) => (
          <div key={item.id} className="p-5 bg-orange-100 mt-5 flex justify-between items-center mb-2">
            <span className="wrap">{item.name}</span>
            <div className="w-12 p-1 border-r-orange-500 rounded text-right">
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => dispatch(updateQuantity({ id: item.id, quantity: parseInt(e.target.value) }))}
                className="w-12 p-1 rounded"
                min="1"
              />
            </div>
            <span>${item.price * item.quantity}</span>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              Remove
            </button>
          </div>
        ))}
        {cart.length > 0 ? (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">
              Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0)}
              <span> &nbsp;Order ID: {orderId}</span>
              <span> &nbsp;Loading: {loading ? 'Yes' : 'No'}</span>
            </h3>
            <button
              className="for-bgcolor text-white w-full py-2 rounded mt-2"
              onClick={handleCheckout}
              disabled={loading || isCheckoutDisabled} // Disable the button while loading
            >
              {loading ? 'Processing...' : isCheckoutDisabled ? 'Payment Successful' : 'Checkout'}
            </button>
          </div>
        ) : (
          !pageLoading && <h3>No item is in the cart. Add some item to the cart..!</h3>
        )}
        {showPayment && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowPayment(false)}>&times;</span>
              <Elements stripe={stripePromise}>
                <Payment
                  totalAmount={cart.reduce((total, item) => total + item.price * item.quantity, 0)}
                  orderId={orderId}
                  onSuccess={handlePaymentSuccess}
                />
              </Elements>
            </div>
          </div>
        )}
      </div>
    )
  );
  
};

export default Cart;
