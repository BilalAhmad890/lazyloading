import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { ShoppingBag } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="py-12">
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Välkommen till MyShop</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Upptäck vår samling av noggrant utvalda produkter för varje tillfälle.
          Högkvalitativa varor till överkomliga priser.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row justify-center items-center gap-12 mb-16">
        <div className="md:w-1/3 text-center">
          <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <ShoppingBag className="text-blue-600" size={24} />
          </div>
          <h2 className="text-xl font-semibold mb-2">Kvalitetsprodukter</h2>
          <p className="text-gray-600">Alla våra produkter är noggrant utvalda för kvalitet och hållbarhet.</p>
        </div>
        
        <div className="md:w-1/3 text-center">
          <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg className="text-blue-600" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">Snabb leverans</h2>
          <p className="text-gray-600">Vi erbjuder snabb och pålitlig leverans till hela Sverige.</p>
        </div>
        
        <div className="md:w-1/3 text-center">
          <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg className="text-blue-600" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">Kundnöjdhet</h2>
          <p className="text-gray-600">Vi sätter alltid kunden först och garanterar din tillfredsställelse.</p>
        </div>
      </div>
      
      <div className="text-center">
        <Link to="/products">
          <Button size="lg">Utforska våra produkter</Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;