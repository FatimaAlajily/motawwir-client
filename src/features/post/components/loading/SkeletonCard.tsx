const SkeletonCard = () => {
  return (
    <div className="col-span-6 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
      {/* تفعيل الحركة المموهة للبطاقة بأكملها */}
      <div className="animate-pulse flex flex-col gap-4">
        {/* Header Skeleton (Avatar + Name + Date) */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200"></div>
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            <div className="h-2 bg-gray-100 rounded w-1/6"></div>
          </div>
        </div>

        {/* Title Skeleton */}
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>

        {/* Content Skeleton */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-100 rounded"></div>
          <div className="h-3 bg-gray-100 rounded w-5/6"></div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 my-1"></div>

        {/* Footer Skeleton (Buttons) */}
        <div className="flex justify-center gap-6">
          <div className="h-3 bg-gray-200 rounded w-16"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
