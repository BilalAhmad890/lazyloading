import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ImageGallery from '../components/ui/ImageGallery';
import Button from '../components/ui/Button';
import Breadcrumb from '../components/ui/Breadcrumb';
import ErrorMessage from '../components/ui/ErrorMessage';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../types';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  
  useEffect(() => {
    setLoading(true);
    setError(null);
    setAddedToCart(false);
    
    if (!id) {
      setError('Produkt-ID saknas');
      setLoading(false);
      return;
    }

fetch(`${apiUrl}/products/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Produkten hittades inte');
        }
        return response.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Ett fel uppstod vid hämtning av produkten');
        }
        setLoading(false);
      });
  }, [id]);
  
  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };
  
  if (loading) {
    return (
      <div className="py-8 animate-pulse">
        <div className="h-5 bg-gray-300 rounded w-1/3 mb-6"/>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/5">
            <div className="bg-gray-300 w-full aspect-[4/3] rounded-lg"/>
          </div>
          <div className="lg:w-2/5">
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"/>
            <div className="h-6 bg-gray-300 rounded w-1/4 mb-6"/>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"/>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"/>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-6"/>
            <div className="h-10 bg-gray-300 rounded w-1/2"/>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="py-8">
        <ErrorMessage message={error} />
        <div className="mt-6">
          <Button onClick={() => navigate('/')}>
            Tillbaka till produkter
          </Button>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return null;
  }
  
  return (
    <div className="py-8">
      <Breadcrumb 
        items={[
          { label: 'Produkter', href: '/' },
          { label: product.title }
        ]}
      />
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-3/5">
          <ImageGallery 
            images={product.images || [product.image || '']}
            productTitle={product.title} 
          />
        </div>
        
        <div className="lg:w-2/5">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
          <p className="text-2xl font-semibold text-blue-600 mb-6">{product.price.toFixed(2)} kr</p>
          
          <div className="mb-8">
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-sm text-gray-500">Kategori: {product.category}</p>
          </div>
          
          <Button 
            onClick={handleAddToCart}
            className="transition-all"
            disabled={addedToCart}
          >
            {addedToCart ? (
              'Tillagd i kundvagnen!'
            ) : (
              <>
                <ShoppingCart className="mr-2" size={18} />
                Lägg i kundvagn
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;