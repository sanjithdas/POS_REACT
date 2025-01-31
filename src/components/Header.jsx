import React from 'react';
import Footer from './Footer';
import Search from './products/Search';
import logo  from '../../public/pos.webp'
import { useDispatch, useSelector } from "react-redux";
import { logout, selectAuth } from "../features/login/AuthSlice";
import { useNavigate } from "react-router-dom";


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(selectAuth);
  console.log(user);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    navigate("/login"); // Redirect to the login page
  };
  return (
    <div className=" bg-gray-100">
      {/* Header */}
      <header className="for-bgcolor text-white p-4 main-header">
        <div className="nav-header">
          <img src={logo} alt="Logo" className="h-8 w-8 mr-2 pos-logo" />
          <ul className="user-logged">
          {user ? (
            <>
              <li><a href="/products">Products</a></li>
              {/* <li><a href="/cart">Carts</a></li> */}
              <ul>
              <li>Welcome, {user.name}</li>
              <li className='logout'>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </li>
              </ul>
            </>
          ) : (
            <li>
              <a href="/login">Login</a>
            </li>
          )}
        </ul>
        </div>
      </header>

      {/* Search Bar */}
      <Search />

    </div>
  );
};

export default Header;
