const UserCardSkeleton = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col items-center">
      <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse mb-3"></div>
      <div className="h-3 bg-gray-200 rounded w-2/3 mb-2 animate-pulse"></div>
      <div className="h-2 bg-gray-100 rounded w-1/3 mb-2 animate-pulse"></div>
      <div className="h-2 bg-gray-100 rounded w-1/4 mb-3 animate-pulse"></div>
      <div className="h-8 bg-gray-100 rounded-xl w-full animate-pulse"></div>
    </div>
  );
};

export default UserCardSkeleton;