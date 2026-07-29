const DashboardSkeleton = () => {
  return (
    <div className="h-screen bg-gray-50 rtl flex flex-col overflow-hidden">
      {/* -------- Navbar Skeleton -------- */}
      <header className="w-full shrink-0 z-20 bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        {/* يمين: الشعار */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
          <div className="w-16 h-5 bg-gray-200 rounded animate-pulse hidden md:block"></div>
        </div>

        {/* وسط: البحث */}
        <div className="w-1/3 h-9 bg-gray-100 rounded-full animate-pulse hidden md:block"></div>

        {/* يسار: الأزرار والأفاتار */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
          <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
          <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
        </div>
      </header>

      {/* -------- Body Skeleton -------- */}
      <div className="flex flex-1 w-full overflow-hidden">
        {/* -------- Sidebar Skeleton -------- */}
        <aside className="hidden md:block w-64 h-full pt-6 px-4 shrink-0 border-l border-gray-100">
          <div className="space-y-3">
            <div className="h-10 bg-gray-200 rounded-full w-full animate-pulse"></div>
            <div className="h-10 bg-gray-100 rounded-full w-full animate-pulse"></div>
            <div className="h-10 bg-gray-100 rounded-full w-full animate-pulse"></div>
            <div className="h-10 bg-gray-100 rounded-full w-full animate-pulse"></div>
            <div className="h-10 bg-gray-100 rounded-full w-full animate-pulse"></div>
          </div>

          {/* صورة الأرنب وزر الخروج في الأسفل */}
          <div className="mt-10 flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 animate-pulse"></div>
            <div className="h-10 bg-gray-100 rounded-full w-full animate-pulse"></div>
          </div>
        </aside>

        {/* -------- Main Content Skeleton -------- */}
        <main className="flex-1 overflow-y-auto p-6 w-full">
          <div className="grid grid-cols-6 gap-4">
            {/* تكرار بطاقات فاضية لتقلد محتوى الصفحة */}
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="col-span-6 md:col-span-3 lg:col-span-6 bg-white rounded-xl p-4 border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-4 animate-pulse">
                  <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-2 bg-gray-100 rounded w-1/6"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                <div className="space-y-2 mb-4 animate-pulse">
                  <div className="h-3 bg-gray-100 rounded"></div>
                  <div className="h-3 bg-gray-100 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
