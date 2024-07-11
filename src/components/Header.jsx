import Cart from "./Cart";
import Navigation from "./Navigation";
import Products from "./products/Products";

const Header = () => {
  return (
    <div className="min-h-screen bg-gray-100">
    {/* Header */}
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src="logo.png" alt="Logo" className="h-8 w-8 mr-2" />
        <span className="font-bold text-lg">Store Name</span>
      </div>
      <div>
        <span>Date/Time</span>
        <span className="ml-4">User</span>
      </div>
    </header>

    {/* Main Content */}
    <div className="container mx-auto p-4">
      {/* Search Bar and Category Filters */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border border-gray-300 rounded w-full"
        />
        {/* Category Filters would go here */}
      </div>

      {/* Product List and Cart */}
      <div className="text-xl text-left ml-2  mr-2 border-dotted border-4 border-teal-600 p-4 h-auto flex" >
        {/* Product List */}
        <Products />
          <div className="border-dotted first:w-1/2 border-r-8 border-teal-600"></div>
        {/* Cart */}
        <Cart />
      </div>

      {/* Footer */}
      <div className="mt-4 bg-white p-4 shadow-lg flex justify-between">
        <div>Payment Methods</div>
        <div>Settings</div>
        <div>Support/Help</div>
      </div>
    </div>
  </div>
  );
};
export default Header;
