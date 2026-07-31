const ProjectCardSkeleton = () => {
  return (
    <div
      className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm w-full h-full flex flex-col animate-pulse"
      style={{ fontFamily: "'Tajawal', sans-serif" }}
    >
      {/* Header (Avatar + Name + Date) */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
          <div className="flex flex-col gap-1.5">
            <div className="h-2 w-20 bg-gray-200 rounded"></div>
            <div className="h-2 w-12 bg-gray-100 rounded"></div>
          </div>
        </div>
        <div className="w-4 h-4 bg-gray-200 rounded"></div>
      </div>

      {/* Title & Badge */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-4 h-4 bg-gray-200 rounded shrink-0"></div>
        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
      </div>

      {/* Project Image */}
      <div className="mb-2.5 rounded-lg bg-gray-100 h-44 w-full"></div>

      {/* Content & Show More */}
      <div className="mb-2.5 flex flex-col gap-1">
        <div className="h-2 bg-gray-100 rounded w-full"></div>
        <div className="h-2 bg-gray-100 rounded w-1/4 mt-1"></div>{" "}
        {/* Show more btn */}
      </div>

      {/* Skills */}
      <div className="flex items-center gap-1 mb-2.5">
        <div className="h-4 bg-gray-100 rounded-full w-10"></div>
        <div className="h-4 bg-gray-100 rounded-full w-10"></div>
        <div className="h-4 bg-gray-100 rounded-full w-10"></div>
      </div>

      {/* Links */}
      <div className="flex items-center gap-2 mt-auto mb-3">
        <div className="h-8 bg-gray-200 rounded-full flex-1"></div>
        <div className="h-8 bg-gray-100 rounded-full flex-1"></div>
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

export default ProjectCardSkeleton;
