import React from 'react';
import Footer from './Footer';
import Search from './products/Search';
import logo  from '../../public/pos.webp'

const Header = () => {
  return (
    <div className=" bg-gray-100">
      {/* Header */}
      <header className="for-bgcolor text-white p-4 m-2 flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 w-8 mr-2 pos-logo" />
        
        </div>
      </header>

      {/* Search Bar */}
      <Search />

    </div>
  );
};

export default Header;
