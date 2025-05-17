import { PackageX } from 'lucide-react';

interface EmptyStateProps {
  message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  message = "Inga produkter hittades." 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <PackageX className="text-gray-400 mb-4" size={64} />
      <p className="text-gray-700 text-lg font-medium">{message}</p>
    </div>
  );
};

export default EmptyState;