import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity, size) => {
    setCart(prevCart => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );

      if (existingProductIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += quantity;
        return updatedCart;
      } else {
        return [...prevCart, { product, quantity, size }];
      }
    });
  };

  const removeFromCart = (productId, size) => {
    setCart(prevCart => 
      prevCart.filter(
        (item) => !(item.product.id === productId && item.size === size)
      )
    );
  };

  // Add new emptyCart function
  const emptyCart = () => {
    setCart([]);
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      emptyCart,
      calculateSubtotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
