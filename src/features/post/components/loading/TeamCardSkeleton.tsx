const TeamCardSkeleton = () => {
  return (
    <div
      className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm w-full h-full flex flex-col animate-pulse"
      style={{ fontFamily: "'Tajawal', sans-serif" }}
    >
      {/* Title & Bookmark */}
      <div className="flex items-start justify-between mb-2">
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="w-4 h-4 bg-gray-200 rounded"></div>
      </div>

      {/* Header (Avatar + Name + Date) */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-gray-200"></div>
        <div className="flex flex-col gap-1.5">
          <div className="h-2 w-20 bg-gray-200 rounded"></div>
          <div className="h-2 w-12 bg-gray-100 rounded"></div>
        </div>
      </div>

      {/* Content & Show More */}
      <div className="mb-3 flex flex-col gap-1.5">
        <div className="h-2 bg-gray-100 rounded w-full"></div>
        <div className="h-2 bg-gray-100 rounded w-5/6"></div>
        <div className="h-2 bg-gray-100 rounded w-1/4 mt-1"></div>{" "}
        {/* Show more btn */}
      </div>

      {/* Skills */}
      <div className="flex items-center gap-1 mb-3">
        <div className="h-4 bg-gray-100 rounded-full w-10"></div>
        <div className="h-4 bg-gray-100 rounded-full w-10"></div>
        <div className="h-4 bg-gray-100 rounded-full w-10"></div>
      </div>

      {/* Join Button */}
      <div className="mt-auto mb-3 flex justify-center">
        <div className="h-8 bg-gray-200 rounded-full w-40"></div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 pt-2 flex justify-center gap-6">
        <div className="h-3 bg-gray-100 rounded w-16"></div>
        <div className="h-3 bg-gray-100 rounded w-16"></div>
        <div className="h-3 bg-gray-100 rounded w-16"></div>
      </div>
    </div>
  );
};

export default TeamCardSkeleton;
