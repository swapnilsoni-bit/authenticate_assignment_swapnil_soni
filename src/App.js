import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import WishListPage from './pages/WishList';
import ProductDetailsPage from './pages/ProductDetailsPage';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishListContext';
import { ProductsProvider } from './contexts/ProductsContext';

function App() {
  return (
    <ProductsProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <div className="App">
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/wishlist" element={<WishListPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/:productName/:productId" element={<ProductDetailsPage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </ProductsProvider>
  );
}

export default App;