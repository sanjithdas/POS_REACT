import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
 
import {selectAllCartItems ,updateQuantity, removeFromCart} from '../features/cart/CartSlice';
import { createOrder } from '../features/order/OrderSlice';


const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectAllCartItems);
  cart['customer_name'] = "Giri";
  cart['customer_email'] = "girish@gmail.com";
  console.log(cart);
  return (
    <div className="w-1/2 bg-white p-4 shadow-lg">
      <h2 className="text-center font-semibold mb-4">Cart</h2>
      {cart.map((item) => (
        <div key={item.id} className="p-5  bg-orange-100 mt-5 flex justify-between items-center mb-2">
          <span className='wrap'>{item.name}</span>
          <div className="w-12 p-1 border-r-orange-500 rounded ml-5 text-right">
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => dispatch(updateQuantity({ id: item.id, quantity: e.target.value }))}
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
      <div className="mt-4">
        <h3 className="text-lg font-semibold">
          Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0)}
        </h3>
        <button className="bg-green-500 text-white w-full py-2 rounded mt-2" onClick={() => dispatch(createOrder(cart))}
          >Checkout</button>
      </div>
    </div>
  );
}

export default Cart