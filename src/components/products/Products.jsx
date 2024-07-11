import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {fetchProducts, selectAllProducts } from '../../features/product/ProductSlice';
import { addToCart } from '../../features/cart/CartSlice';

const Products = () => {
  
   const dispatch = useDispatch();
   
   const products = useSelector(selectAllProducts);
   console.log( products);
   useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const [item,setItem] = useState({});



  const handleAddToCart = (product) =>{
  //  alert(e.target);
    dispatch(addToCart(product))
  }
  
  return (
    <div className="w-1/3 text-right">
      <h2 className='text-center uppercase underline'>Products</h2>
      {products.map(product => (
        <div key={product.id} className='border-b-green-50 mt-3'>
          <span className='text-left'>{product.name} - ${product.price}</span>
          <button   onClick={() => handleAddToCart(product)}  className='bg-teal-200 m-2 p-2' >Add to Cart</button>
        </div>
      ))}
    </div>
  )
}

export default Products