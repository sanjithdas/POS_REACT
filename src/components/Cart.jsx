import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllCartItems, updateQuantity, removeFromCart } from '../features/cart/CartSlice';
import { createOrder, updateOrder } from '../features/order/OrderSlice';
import {fetchProducts} from '../features/product/ProductSlice.js'

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectAllCartItems);
  const [orderId, setOrderId] = useState(null); // Use useState to manage orderId
  const [loading, setLoading] = useState(false); // Use useState for loading status


  const [pageLoading, setPageLoading] = useState(true); // Initial loading state

  // Simulate loading products
  useEffect(() => {
    // Fetch products and then set loading to false
    dispatch(fetchProducts({page : 1})).then(() => {
      setPageLoading(false); // Set loading to false once products are loaded
    });
  }, [dispatch]);

  // Handle checkout
  const handleCheckout = async () => {
    const orderData = {
      customerName: 'Giri',
      customerEmail: 'girish@gmail.com',
      products: cart
    };
    
    setLoading(true); // Set loading to true when starting the checkout process

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
    } catch (error) {
      console.error('Error creating/updating order:', error);
    } finally {
      setLoading(false); // Set loading to false when the process is complete
    }
  };

  return (
    <div className="w-1/2 bg-white p-4 shadow-lg">
      <h2 className="text-center font-semibold mb-4 cart-header">CART</h2>
      {cart && cart.map((item) => (
        <div key={item.id} className="p-5 bg-orange-100 mt-5 flex justify-between items-center mb-2">
          <span className="wrap">{item.name}</span>
          <div className="w-12 p-1 border-r-orange-500 rounded ml-5 text-right">
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => dispatch(updateQuantity({ id: item.id, quantity: parseInt(e.target.value) }))}
              className="w-12 p-1 rounded ml-5"
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
            disabled={loading} // Disable the button while loading
          >
            {loading ? 'Processing...' : 'Checkout'}
          </button>
        </div>
      ) : !pageLoading && (
        <h3> No item is in the cart. Add some item to the cart..!</h3>
      )}
    </div>
  );
};

export default Cart;
