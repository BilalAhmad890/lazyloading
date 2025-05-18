

interface LoadingSkeletonProps {
  count?: number;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={`loading ${index + 1}`} className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
          <div className="bg-gray-300 h-48 w-full"/>
          <div className="p-4">
            <div className="h-5 bg-gray-300 rounded w-3/4 mb-4"/>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"/>
            <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"/>
            <div className="flex justify-between items-center mt-4">
              <div className="h-6 bg-gray-300 rounded w-1/4"/>
              <div className="h-8 bg-gray-300 rounded w-1/4"/>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;