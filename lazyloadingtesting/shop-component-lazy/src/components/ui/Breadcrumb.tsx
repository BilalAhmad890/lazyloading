import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 mb-6">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={item.label} className="inline-flex items-center">
              {index > 0 && (
                <ChevronRight className="mx-1 text-gray-400" size={16} />
              )}
              
              {isLast || !item.href ? (
                <span className={`text-sm ${isLast ? 'text-gray-700 font-medium' : 'text-gray-500'}`}>
                  {item.label}
                </span>
              ) : (
                <Link 
                  to={item.href} 
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;