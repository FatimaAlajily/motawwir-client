"use client";

import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";

import {
  Home,
  MessageSquare,
  HelpCircle,
  Globe,
  Briefcase,
  Users,
  FolderKanban,
  LogOut,
  User2,
} from "lucide-react";

import "../../../styles/theme.css";
import SideBarIcons from "../common/SideBarIcons";
import rabbitSidebar from "../../../assets/images/rabbit-sidebar.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutRequest } from "../../../features/users/api/UserApi";
import { useAuthStore } from "../../../features/auth/store/useAuthStore";

type SideBarProps = {
  onNavigate?: () => void;
};

const NAV_LINKS = [
  { to: "/dashbord", label: "الصفحة الرئيسية", icon: Home },
  { to: "/dashbord/chat", label: "الدردشة العالمية", icon: MessageSquare },
  { to: "/dashbord/posts/question", label: "الأسئلة", icon: HelpCircle },
  { to: "/dashbord/posts/new", label: "الأخبار", icon: Globe },
  { to: "/dashbord/posts/work", label: "فرص العمل", icon: Briefcase },
  { to: "/dashbord/posts/team", label: "كون فريق", icon: Users },
  { to: "/dashbord/posts/project", label: "المشاريع", icon: FolderKanban },
  { to: "/dashbord/users", label: "قائمة المستخدمين", icon: User2 },
];

export function SideBar({ onNavigate }: SideBarProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const currentUser = useAuthStore((state) => state.user); // جلب المستخدم الحالي
  const logoutStore = useAuthStore((state) => state.logout);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await logoutRequest();
    } catch (error) {
      console.error("فشل تسجيل الخروج من الخادم:", error);
    } finally {
      localStorage.removeItem("token");

      if (logoutStore) {
        logoutStore();
      }

      if (onNavigate) {
        onNavigate();
      }

      navigate("/");
    }
  };

  return (
    <Sidebar
      aria-label="نافذة الاقسام"
      className="bg-white [&>div]:bg-white no-scrollbar rounded-l-2xl h-full pt-1 pb-4 shadow-sm flex flex-col"
    >
      <SidebarItems className="flex flex-col h-full">
        <SidebarItemGroup className="space-y-1.5 mt-6 flex-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.to;
            return (
              <Link key={link.to} to={link.to} onClick={onNavigate}>
                <SidebarItem
                  icon={() => (
                    <SideBarIcons
                      icon={link.icon}
                      color={"text-[4b1e8a]"}
                      size={16}
                    />
                  )}
                  className={`font-semibold rounded-full ${
                    isActive
                      ? "bg-[#e5e5f8] text-[#4b1e8a] hover:bg-[#e5e5f8]"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span
                    className={`font-semibold text-sm ${
                      isActive ? "text-[#4b1e8a]" : ""
                    }`}
                  >
                    {link.label}
                  </span>
                </SidebarItem>
              </Link>
            );
          })}
        </SidebarItemGroup>

        {/* -------- Bottom Section */}
        <SidebarItemGroup className="mt-auto">
          <div className="flex justify-center mb-4">
            <img
              src={rabbitSidebar}
              alt="صورة توضيحية"
              className="h-24 w-24 object-contain"
            />
          </div>
          {/* إظهار زر تسجيل الخروج فقط إذا كان المستخدم مسجلاً للدخول */}
          {currentUser && (
            <Link to="#" onClick={handleLogout}>
              <SidebarItem
                icon={() => (
                  <SideBarIcons icon={LogOut} color={"text-[4b1e8a]"} size={16} />
                )}
                className="text-gray-700 font-semibold hover:bg-gray-100 rounded-full"
              >
                <span className="font-semibold text-sm">تسجيل الخروج</span>
              </SidebarItem>
            </Link>
          )}
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}