import { Outlet } from "react-router-dom";
import { NavBar } from "../shared/components/common/NavBar";
import { SideBar } from "../shared/components/common/SideBar";

const Dashbord = () => {
  return (
    <div className="min-h-screen bg-gray-50 rtl flex flex-col">
      {/* ---------- NavBar Header --------- */}
      <header className="top-0 z-20 w-full">
        <NavBar />
      </header>

      {/* ---------- SideBar & Content ---------- */}
      {/* أضفنا w-full أو max-w لمنع التمدد الأفقي */}
      <div className="flex flex-1 w-full">
        {/* تم إصلاح الخطأ الإملائي وإغلاق القوس هكذا: h-[calc(100vh-80px)] mt-4 */}
        <aside className="sticky top-16 h-[calc(100vh-80px)] mt-4 shrink-0">
          <SideBar />
        </aside>

        {/* ---------- Main Content --------- */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* تم إزالة وسم h1 لأنه يسبب مشاكل في تنسيق الصفحات */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashbord;
