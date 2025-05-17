import { useState, useEffect } from 'react';
import SearchBar from '../components/ui/SearchBar';
import ProductCard from '../components/ui/ProductCard';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import EmptyState from '../components/ui/EmptyState';
import ErrorMessage from '../components/ui/ErrorMessage';
import type { Product } from '../types';

const ProductsList: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  
  useEffect(() => {
    setLoading(true);
    
    fetch(`${apiUrl}/products`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Ett fel uppstod vid hämtning av produkter. Försök igen senare.');
        console.error(err);
        setLoading(false);
      });
  }, []);
  
  const handleSearch = (query: string) => {
    if (query.trim() === '') {
      setFilteredProducts(products);
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const results = products.filter(
        product => 
          product.title.toLowerCase().includes(lowerCaseQuery) ||
          product.description.toLowerCase().includes(lowerCaseQuery) ||
          product.category.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredProducts(results);
    }
  };
  
  if (error) {
    return (
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-6">Produkter</h1>
        <SearchBar onSearch={handleSearch} />
        <ErrorMessage message={error} />
      </div>
    );
  }
  
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6">Produkter</h1>
      
      <SearchBar onSearch={handleSearch} />
      
      {loading ? (
        <LoadingSkeleton count={8} />
      ) : filteredProducts.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsList;