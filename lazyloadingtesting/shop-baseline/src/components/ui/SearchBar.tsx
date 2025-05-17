import { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Sök produkter..." 
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mb-6">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <button 
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white rounded-md px-3 py-1 text-sm font-medium hover:bg-blue-800 transition-colors"
        >
          Sök
        </button>
      </div>
    </form>
  );
};

export default SearchBar;