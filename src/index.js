import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ProductsProvider } from './contexts/ProductsContext';
import { ProductDetailsProvider } from './contexts/ProductDetailsContext'; 
import { AuthProvider } from './contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ProductsProvider>
        <ProductDetailsProvider>
          <App />
        </ProductDetailsProvider>
      </ProductsProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();


