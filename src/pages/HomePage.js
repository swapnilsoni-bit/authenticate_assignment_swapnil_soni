import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../contexts/ProductsContext';

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const navigate = useNavigate();
  const { products, status, error } = useProducts();

  // Memoize pagination calculations to prevent unnecessary recalculations
  const { totalPages, currentProducts } = useMemo(() => {
    const total = Math.ceil(products.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const current = products.slice(startIndex, startIndex + productsPerPage);
    return { totalPages: total, currentProducts: current };
  }, [products, currentPage, productsPerPage]);

  // Navigation handler for product details
  const handleProductClick = (product) => {
    navigate(`/${product.title}/${product.id}`, { state: { product } });
  };

  // Loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Error state
  if (status === 'failed') {
    return (
      <div className="text-center p-8">
        <p className="text-red-500">Error: {error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto p-8">
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product)}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-contain rounded-lg mb-6"
              loading="lazy" // Add lazy loading for better performance
            />
            <h3 className="text-xl font-bold mb-3 line-clamp-2">{product.title}</h3>
            <p className="text-gray-700 text-lg">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-md ${
                currentPage === index + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
