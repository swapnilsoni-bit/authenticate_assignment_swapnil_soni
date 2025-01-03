import React, { createContext, useContext, useReducer, useEffect, useRef } from 'react';

// Define action types as constants to avoid typos
const ACTIONS = {
  FETCH_START: 'FETCH_PRODUCTS_START',
  FETCH_SUCCESS: 'FETCH_PRODUCTS_SUCCESS',
  FETCH_ERROR: 'FETCH_PRODUCTS_ERROR',
};

// Initial state for the products context
const initialState = {
  products: [],
  status: 'idle', // possible values: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Context creation
const ProductsContext = createContext();
const ProductsDispatchContext = createContext();

// Reducer function to handle state updates
function productsReducer(state, action) {
  switch (action.type) {
    case ACTIONS.FETCH_START:
      return { ...state, status: 'loading' };
    case ACTIONS.FETCH_SUCCESS:
      return { 
        ...state, 
        status: 'succeeded', 
        products: action.payload,
        error: null 
      };
    case ACTIONS.FETCH_ERROR:
      return { 
        ...state, 
        status: 'failed', 
        error: action.payload,
        products: [] 
      };
    default:
      return state;
  }
}

export function ProductsProvider({ children }) {
  const [state, dispatch] = useReducer(productsReducer, initialState);
  // Use useRef to track if the initial fetch has been made
  const initialized = useRef(false);

  // Fetch products data
  const fetchProducts = async () => {
    dispatch({ type: ACTIONS.FETCH_START });
    try {
      // Check for token in localStorage
      const userData = localStorage.getItem('user');
      const token = userData ? JSON.parse(userData).token : null;

      const headers = token
        ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        : { 'Content-Type': 'application/json' };

      const response = await fetch('https://fakestoreapi.com/products', { headers });
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ACTIONS.FETCH_ERROR, payload: error.message });
    }
  };

  useEffect(() => {
    // Only fetch if we haven't already initialized
    if (!initialized.current) {
      initialized.current = true;
      fetchProducts();
    }
  }, []);

  return (
    <ProductsContext.Provider value={state}>
      <ProductsDispatchContext.Provider value={dispatch}>
        {children}
      </ProductsDispatchContext.Provider>
    </ProductsContext.Provider>
  );
}

// Custom hooks for consuming the context
export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}

export function useProductsDispatch() {
  const context = useContext(ProductsDispatchContext);
  if (context === undefined) {
    throw new Error('useProductsDispatch must be used within a ProductsProvider');
  }
  return context;
}
