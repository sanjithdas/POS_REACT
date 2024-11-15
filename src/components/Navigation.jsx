import React from 'react'
import { NavLink} from 'react-router-dom';
const Navigation = () => {
  return (
    <>
        <ul className='flex flex-wrap space-x-4'>
          <li>
            <NavLink to="/products">Home</NavLink>
          </li>
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
          <li>
            <NavLink to="/orders">Orders</NavLink>
          </li>
        </ul>
    </>
  )
}

export default Navigation