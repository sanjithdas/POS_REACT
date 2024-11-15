import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts, productsCleared } from '../../features/product/ProductSlice'; // Adjust path as needed

const Search = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  
  // Store the current AbortController instance
  const abortControllerRef = useRef(null);

  // Debounce the search term to delay dispatching fetchProducts until the user stops typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // Delay of 500ms

    // Cleanup function to clear the timeout if the user types again within the delay period
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Fetch products based on debounced search term
  useEffect(() => {
    if (debouncedSearchTerm !== '') {
      // Cancel the previous request if it exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort(); // Cancel the previous request
      }

      // Create a new AbortController for the current request
      const newAbortController = new AbortController();
      abortControllerRef.current = newAbortController; // Store it in ref

      // Clear the products before starting a new search
      dispatch(productsCleared());

      // Dispatch the fetch with the abort signal
      dispatch(fetchProducts({ searchQuery: debouncedSearchTerm, signal: newAbortController.signal }));
    } else {
      // Fetch all products if no search query is provided (only once)
      dispatch(fetchProducts({ searchQuery: '' })); // No signal needed here
    }
  }, [debouncedSearchTerm, dispatch]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query); // Update the search term when the user types
  };

  return (
    <div className="for-bgcolor text-black font-semibold p-1 m-2">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search products..."
        className="search-prod p-2 border border-gray-300 rounded w-full"
      />
    </div>
  );
};

export default Search;
