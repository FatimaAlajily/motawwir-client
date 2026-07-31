import { Outlet } from "react-router-dom";
import { NavBar } from "../shared/components/common/NavBar";
import { SideBar } from "../shared/components/common/SideBar";
import { useState } from "react";

const Dashbord = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="h-screen bg-gray-50 rtl flex flex-col overflow-hidden">
      {/* ---------- NavBar Header --------- */}
      <header className="w-full shrink-0 z-20 ">
        <NavBar onMenuClick={() => setIsSidebarOpen(true)} />
      </header>

      {/* ---------- SideBar & Content ---------- */}
      <div className="flex flex-1 w-full overflow-hidden relative">
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}
        <aside
          className={`
            fixed md:static inset-y-0 right-0 z-40
            w-64 md:w-auto
            h-full shrink-0 overflow-y-auto
            pt-4
            transition-transform duration-300 ease-in-out
            ${
              isSidebarOpen
                ? "translate-x-0"
                : "translate-x-full md:translate-x-0"
            }`}
        >
          <SideBar onNavigate={() => setIsSidebarOpen(false)} />
        </aside>

        {/* ---------- Main Content --------- */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashbord;
