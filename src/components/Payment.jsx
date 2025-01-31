// src/components/Payment.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handlePayment } from '../features/payment/PaymentSlice'; // Import your payment action
import BarcodePayment from './BarcodePayment'; // Barcode Payment Component
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import stripeLogo from "../../public/stripe-logo.png";

const Payment = ({ totalAmount, orderId, onSuccess }) => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [paymentStatus, setPaymentStatus] = useState('');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [isCardComplete, setIsCardComplete] = useState(false);

  const processStripePayment = async () => {
    if (!stripe || !elements) return; // Ensure Stripe.js has loaded

    const cardElement = elements.getElement(CardElement);

    // Create a token using the CardElement
    const { error, token } = await stripe.createToken(cardElement);

    if (error) {
      console.error('Payment Error:', error);
      setPaymentStatus(error.message);
      return;
    }

    const paymentData = {
      stripeToken: token.id, // Token from Stripe.js
      amount: totalAmount, // Total amount to charge
      orderId: orderId, // The ID of the order to update
    };

    try {
      setPaymentLoading(true);
      // Dispatch the payment action with the token and amount
      const response = await dispatch(handlePayment(paymentData));

      if (response.payload.success) {
        setPaymentStatus('Payment Successful');
        onSuccess();
      } else {
        setPaymentStatus('Payment Failed');
      }
    } catch (error) {
      console.error('Payment Error:', error);
      setPaymentStatus('Payment Error');
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="payment-container p-5 bg-white rounded shadow-lg max-w-lg mx-auto">
      <div className="payment-header mb-5">
        <h2 className="text-xl font-bold mb-3">Payment Options</h2>
        <p className="text-gray-600">Choose a payment method below:</p>
      </div>

      {/* Barcode Payment Section */}
      <div className="barcode-payment-section mb-5">
        <h3 className="text-lg font-semibold mb-3">Option 1: Pay via Barcode</h3>
        <BarcodePayment orderId={orderId} amount={totalAmount} />
      </div>

      {/* Divider */}
      <div className="my-5 border-t border-gray-200"></div>

      {/* Stripe Payment Section */}
      <div className="stripe-payment-section">
        <h3 className="text-lg font-semibold flex items-center mb-3">
          <img
            src={stripeLogo}
            alt="Stripe Logo"
            width="30"
            height="30"
            className="inline-block mr-2"
          />
          Payment Details
        </h3>

        <div className="payment-input mb-3">
          <label
            htmlFor="cardholder-name"
            className="block text-sm font-medium text-gray-700"
          >
            Cardholder's Name
          </label>
          <input
            type="text"
            id="cardholder-name"
            placeholder="Enter your name"
            className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            value="Sanjith Das"
            readOnly
          />
        </div>

        <div className="payment-input mb-3">
          <label
            htmlFor="card-details"
            className="block text-sm font-medium text-gray-700"
          >
            Card Details
          </label>
          <div
            id="card-details"
            className="mt-1 p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          >
            <CardElement
              className="card-element"
              onChange={(event) => setIsCardComplete(event.complete)}
            />
          </div>
        </div>

        <button
          onClick={processStripePayment}
          className={`pay-button w-full px-4 py-2 rounded mt-4 text-white ${
            !isCardComplete || paymentLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
          disabled={!isCardComplete || paymentLoading} // Disable button if card details are incomplete or loading
        >
          {paymentLoading ? 'Processing...' : 'Pay Now'}
        </button>

        {/* Status and Loading Messages */}
        {!isCardComplete && (
          <p
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-3"
            role="alert"
          >
            Please fill all the fields.
          </p>
        )}
        {paymentLoading && (
          <p
            className="bg-orange-100 border border-orange-400 text-orange-400 px-4 py-3 rounded mt-3"
            role="alert"
          >
            Please wait... We are processing your payment.
          </p>
        )}
        {paymentStatus && (
          <p
            className={`px-4 py-3 rounded mt-3 ${
              paymentStatus === 'Payment Successful'
                ? 'bg-green-100 border border-green-400 text-green-700'
                : 'bg-red-100 border border-red-400 text-red-700'
            }`}
            role="alert"
          >
            {paymentStatus}
          </p>
        )}
      </div>
    </div>
  );
};

export default Payment;
