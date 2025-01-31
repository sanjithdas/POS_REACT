import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../features/product/ProductSlice'; // Import addProduct thunk
import { selectProductsLoading } from '../features/product/ProductSlice'; // Selector for loading state
import { toast, ToastContainer  } from "react-toastify"; // Import react-toastify
import { useNavigate } from "react-router-dom"; // For navigation
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS
import { selectAuth } from '../features/login/AuthSlice'
// Initialize toast notifications
//toast.configure();

const ProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const loading = useSelector(selectProductsLoading); // Use loading state for button feedback
  const { user } = useSelector(selectAuth);
  console.log(user.id);
  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: null,
    stock: '',
    user_id:  user.id
  });

  const [error, setError] = useState('');

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle file input for image
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!formData.name || !formData.price || !formData.description || !formData.stock) {
      setError('Please fill in all fields.');
      return;
    }
    if (!formData.image) {
      setError('Please upload an image.');
      return;
    }

    setError(''); // Clear any previous errors

    try {
      // Prepare the form data for submission (for file uploads)
      const productData = new FormData();
      productData.append('name', formData.name);
      productData.append('price', formData.price);
      productData.append('description', formData.description);
      productData.append('image', formData.image); // Image file
      productData.append('stock', formData.stock);
      productData.append('user_id', formData.user_id);
      console.log(productData);

      // Dispatch the addProduct thunk
      const result = await dispatch(addProduct(productData));
     
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Product added successfully!");
        navigate("/products"); // Redirect to the products page
      } else {
        toast.error("Failed to add product. Please try again.");
      }
    
      // Reset the form
      setFormData({
        name: '',
        price: '',
        description: '',
        image: '',
        stock: '',
        user_id: ''
      });
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Failed to add the product. Please try again.');
    }
  };

  return (
    <div className='w-full max-w-md mx-auto mt-10'>
      <h2 className='text-2xl font-bold text-center mb-5'>Add New Product</h2>
      <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        {/* Product Name */}
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
            Product Name
          </label>
          <input
            type='text'
            name='name'
            id='name'
            value={formData.name}
            onChange={handleInputChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            placeholder='Enter product name'
          />
        </div>

        {/* Product Price */}
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='price'>
            Price
          </label>
          <input
            type='number'
            name='price'
            id='price'
            value={formData.price}
            onChange={handleInputChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            placeholder='Enter product price'
          />
        </div>

        {/* Product Description */}
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='description'>
            Description
          </label>
          <textarea
            name='description'
            id='description'
            value={formData.description}
            onChange={handleInputChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            placeholder='Enter product description'
          ></textarea>
        </div>

        {/* Product Stock */}
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='stock'>
            Stock
          </label>
          <input
            type='number'
            name='stock'
            id='stock'
            value={formData.stock}
            onChange={handleInputChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            placeholder='Enter product stock quantity'
          />
        </div>

        {/* Product Image */}
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='image'>
            Image
          </label>
          <input
            type='file'
            name='image'
            id='image'
            onChange={handleFileChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>

        {/* Error Message */}
        {error && <p className='text-red-500 text-xs italic mb-4'>{error}</p>}

        {/* Submit Button */}
        <div className='flex items-center justify-between'>
          <button
            type='submit'
            disabled={loading} // Disable button when loading
            className={`${
              loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'
            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >
            {loading ? 'Adding...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
