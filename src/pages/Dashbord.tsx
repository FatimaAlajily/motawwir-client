import { Outlet } from "react-router-dom";
import { NavBar } from "../shared/components/common/NavBar";
import { SideBar } from "../shared/components/common/SideBar";

const Dashbord = () => {
  return (
    <div className="min-h-screen bg-gray-50 rtl flex flex-col">
      {/* ---------- NavBar Header --------- */}

      <div className="">
        <header className=" top-0 z-20">
          <NavBar />
        </header>

        {/* ---------- SideBar Mnue ---------- */}
        <div className="flex flex-1">
          <aside className="sticky top-16 h-[calc(100vh-80px) mt-4">
            <SideBar />
          </aside>

          {/* ---------- Main Content --------- */}
          <main className="flex-1 p-6">
            <h1 className="text-2xl font-bold text-gray-800">
              <Outlet />
            </h1>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashbord;
