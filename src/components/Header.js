import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';  // Import the useAuth hook

const Header = ({ showNotification }) => {
  const navigate = useNavigate();
  
  // Use context to get the user state
  const { user, logout } = useAuth();

  // Check if the user is logged in by checking if user exists
  const isLoggedIn = !!user;

  const handleHomeClick = () => navigate('/home');
  const handleCartClick = () => navigate('/cart');
  const handleWishListClick = () => navigate('/wishlist');
  const handleLoginClick = () => {
    if (isLoggedIn) {
      // Log out by calling logout function from context
      logout();
      navigate('/login');
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white shadow-md h-12">
      <div className="flex justify-between items-center h-full px-6">
        <div className="flex items-center space-x-3">
          {/* Logo with Favicon */}
          <div className="flex items-center cursor-pointer" onClick={handleHomeClick}>
            <img
              src="/favicon.ico" // Favicon Image
              alt="ShopOrbit Logo"
              className="w-10 h-10"
            />
            <span className="ml-2 text-lg font-bold text-gray-800">ShopOrbit</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-4">
            <button
              onClick={handleHomeClick}
              className="text-gray-500 hover:text-black transition-colors font-medium"
            >
              Home
            </button>
            <button
              onClick={handleCartClick}
              className="text-gray-500 hover:text-black transition-colors font-medium"
            >
              Cart
            </button>
            <button
              onClick={handleWishListClick}
              className="text-gray-500 hover:text-black transition-colors font-medium"
            >
              Wishlist
            </button>
          </nav>
        </div>

        {/* Action Button */}
        <button
          onClick={handleLoginClick}
          className={`${
            isLoggedIn ? 'bg-red-600 hover:bg-red-500' : 'bg-blue-600 hover:bg-blue-500'
          } text-white py-1 px-4 rounded-md shadow-md transition-all font-medium`}
        >
          {isLoggedIn ? 'Sign Out' : 'Login'}
        </button>
      </div>

      {/* Notification */}
      {showNotification && (
        <div
          className="fixed top-16 right-4 bg-green-500 text-white py-2 px-4 rounded-md shadow-2xl transition-opacity duration-300"
          style={{ opacity: showNotification ? 1 : 0 }}
        >
          <p>Product added to cart!</p>
        </div>
      )}
    </header>
  );
};

export default Header;
