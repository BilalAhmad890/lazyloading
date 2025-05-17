import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    description: string;
    price: number;
    image?: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  // Prepend API URL if the image path is relative
  const fullImageUrl = product.image?.startsWith('http') 
    ? product.image 
    : `${apiUrl}${product.image}`;

  return (
    <Link 
      to={`/products/${product.id}`}
      className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="relative pb-[75%]"> {/* 4:3 aspect ratio */}
        <img 
          src={fullImageUrl}
          alt={product.title}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <h2 className="font-semibold text-lg mb-1 group-hover:text-blue-600 transition-colors">
          {product.title}
        </h2>
        <p className="text-blue-600 font-medium">{product.price.toFixed(2)} kr</p>
      </div>
    </Link>
  );
};

export default ProductCard;