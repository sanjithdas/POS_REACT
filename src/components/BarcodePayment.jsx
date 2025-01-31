import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  generateBarcode,
  updatePaymentStatus,
  selectBarcode,
  selectLoading,
  selectError,
  resetBarcode,
  selectPaymentStatus,
} from '../features/payment/BarcodePaymentSlice';

const BarcodePayment = ({ orderId, amount }) => {
  const dispatch = useDispatch();
  const barcode = useSelector(selectBarcode);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const paymentStatus = useSelector(selectPaymentStatus);
  const [showBarcode, setShowBarcode] = useState(false);

  const handleGenerateBarcode = () => {
    // if (!orderId || !amount) {
    //   alert('Order ID and Amount are required to generate a barcode.');
    //   return;
    // }
    console.log(orderId);
    dispatch(generateBarcode({ orderId, amount }));
    setShowBarcode(true);
  };

  const handleConfirmPayment = () => {
    dispatch(updatePaymentStatus({ orderId, amount, status: 'completed' }));
  };

  const handleResetBarcode = () => {
    dispatch(resetBarcode());
    setShowBarcode(false);
  };

  return (
    <div className="barcode-payment">
      <h3 className="font-bold text-lg mb-4">Generate Barcode for Payment</h3>
      <button
        onClick={handleGenerateBarcode}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? 'Generating...' : 'Generate Barcode'}
      </button>
      {error && (
        <p className="text-red-500 mt-2">
          {error}
        </p>
      )}
      {showBarcode && barcode && (
        <div className="barcode-container mt-4 p-4 border rounded bg-gray-100">
          <h4 className="font-medium text-lg mb-2">Scan this Barcode</h4>
          <div
            dangerouslySetInnerHTML={{ __html: barcode }}
            className="p-2 bg-white border rounded"
          />
          <button
            onClick={handleConfirmPayment} // Update payment when clicked
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-4"
          >
            Confirm Payment
          </button>
          {paymentStatus && (
            <p
              className={`mt-4 px-4 py-2 rounded ${
                paymentStatus === 'Payment Successful'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {paymentStatus}
            </p>
          )}
          <button
            onClick={handleResetBarcode}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mt-4"
          >
            Reset Barcode
          </button>
        </div>
      )}
    </div>
  );
};

export default BarcodePayment;
