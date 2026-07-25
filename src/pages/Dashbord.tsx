import { NavBar } from "../shared/components/common/NavBar";
import { SideBar } from "../shared/components/common/SideBar";

const Dashbord = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 rtl">
      {/* ---------- SideBar Mnue ---------- */}
      <aside className="sticky top-0 h-screen shrink-0">
        <SideBar />
      </aside>

      {/* ---------- NavBar Header --------- */}

      <div className="flex flex-col flex-1 min-w-0">
        <header className="sticky top-0 z-40">
          <NavBar />
        </header>

        {/* ---------- Main Content --------- */}

        <main className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">
            مرحباً بك في منتدى المبرمجين
          </h1>
        </main>
      </div>
    </div>
  );
};

export default Dashbord;
