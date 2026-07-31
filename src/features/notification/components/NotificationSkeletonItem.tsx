const NotificationSkeletonItem = () => {
  return (
    <div className="flex items-start gap-2.5 w-full px-3 py-2.5 border-b border-gray-50 last:border-0 animate-pulse">
      <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0" />
      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-3/4" />
        <div className="h-2 bg-gray-100 rounded w-1/4 mt-0.5" />
      </div>
    </div>
  );
};

export default NotificationSkeletonItem;
