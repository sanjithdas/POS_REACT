import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, selectAllProducts, selectProductsLoading, selectProductsError, selectProductsPagination } from '../../features/product/ProductSlice';
import { addToCart } from '../../features/cart/CartSlice';
import loadingStatus from "../../../public/loading.webp";
import { useNavigate } from "react-router-dom";
import { selectAuth } from "../../features/login/AuthSlice";
const Products = () => {
  const dispatch = useDispatch();
  
  // Get the product data and pagination info from the state
  const products = useSelector(selectAllProducts); // Get products from the state
  const pagination = useSelector(selectProductsPagination); // Get pagination info from the state
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const { token } = useSelector(selectAuth);
    const { user } = useSelector(selectAuth);
    console.log("totken is ",token,user); 
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch products when component loads or when the page changes
  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage }));
  }, [dispatch, currentPage]);
  
console.log(products)

  // Handler for pagination clicks
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <p className='m-7'><img src={loadingStatus} width="40" height="40" title='Loading...' />Loading... Please wait</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!products || products.length === 0) {
    return <p className='text-center'>No products found.</p>;
  }
  
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="p-2 width-for" >
      <h2 className='text-center uppercase font-bold'>Products</h2>
      {products.map(product => (
        <div key={product.id} className='mt-3 flex justify-between border border-gray-200'>
          <div className='for-align for-product ml-2'>
          <span className='text-left font-normal'>{product.name} - ${product.price}</span>
          </div>
          <div className='for-align p-3'>
             <img src={product.image} width="100px" height="100px" alt="product" />
          </div>
          <div className='for-cart p-3'>
		        <button onClick={() => handleAddToCart(product)} className='px-2 py-1 text-sm for-button text-white rounded m-2 add-to-cart'>
              Add to Cart
            </button>
            </div>
        </div>
      ))}

      {/* Pagination Links */}
      <div className='pagination'>
        {Array.from({ length: pagination?.last_page || 1 }, (_, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`m-2 p-2 ${pageNumber === pagination?.current_page ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Products;
