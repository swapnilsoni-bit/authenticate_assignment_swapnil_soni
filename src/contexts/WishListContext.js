import React, { createContext, useState, useContext } from 'react';
import { useCart } from './CartContext';

const WishListContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { addToCart } = useCart();

  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.find((item) => item.id === product.id)) {
        return prevWishlist;
      }
      return [...prevWishlist, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId));
  };

  const addAllToCart = () => {
    wishlist.forEach((product) => {
      addToCart(product, 1, ''); // Defaulting quantity to 1 and size to empty
    });
    setWishlist([]); // Optionally clear the wishlist after adding items to cart
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  return (
    <WishListContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        addAllToCart,
        isInWishlist,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};

export const useWishlist = () => useContext(WishListContext);
