import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm h-[60px] flex items-center">
      <div className="max-w-[1400px] w-full mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <ShoppingBag className="text-blue-600" size={24} />
          <span>MyShop</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;