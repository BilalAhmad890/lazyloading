import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="p-4 border border-red-300 bg-red-50 rounded-lg flex items-center gap-3">
      <AlertCircle className="text-red-500" size={20} />
      <p className="text-red-700">{message}</p>
    </div>
  );
};

export default ErrorMessage;