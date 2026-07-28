import { Outlet } from "react-router-dom";
import { NavBar } from "../shared/components/common/NavBar";
import { SideBar } from "../shared/components/common/SideBar";

const Dashbord = () => {
  return (
    <div className="h-screen bg-gray-50 rtl flex flex-col overflow-hidden">
      {/* ---------- NavBar Header --------- */}
      <header className="shrink-0 z-20 w-full">
        <NavBar />
      </header>

      {/* ---------- SideBar & Content ---------- */}
      <div className="flex flex-1 w-full overflow-hidden">
        <aside className="shrink-0 overflow-y-auto">
          <SideBar />
        </aside>

        {/* ---------- Main Content --------- */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashbord;
