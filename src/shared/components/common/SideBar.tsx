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
import { Link } from "react-router-dom";

type SideBarProps = {
  onNavigate?: () => void;
};

export function SideBar({ onNavigate }: SideBarProps) {
  return (
    <Sidebar
      aria-label="نافذة الاقسام"
      className=" bg-white [&>div]:bg-white no-scrollbar rounded-l-2xl h-full pt-1 pb-4 shadow-sm flex flex-col"
    >
      <SidebarItems className="flex flex-col h-full">
        <SidebarItemGroup className="space-y-1.5 mt-6 flex-1">
          <Link to={"/dashbord"} onClick={onNavigate}>
            <SidebarItem
              icon={() => (
                <SideBarIcons icon={Home} color={"text-[4b1e8a]"} size={16} />
              )}
              className="bg-[#e5e5f8] text-[#4b1e8a] font-semibold rounded-full hover:bg-[#e5e5f8]"
            >
              <span className="font-semibold text-sm text-[#4b1e8a]">
                الصفحة الرئيسية
              </span>
            </SidebarItem>
          </Link>
          <Link to={"/dashbord/chat"} onClick={onNavigate}>
            <SidebarItem
              icon={() => (
                <SideBarIcons
                  icon={MessageSquare}
                  color={"text-[4b1e8a]"}
                  size={16}
                />
              )}
              className="text-gray-700 font-semibold hover:bg-gray-100 rounded-full no-scrollbar "
            >
              <span className="font-semibold text-sm">الدردشة العالمية</span>
            </SidebarItem>
          </Link>
          <Link to={"/dashbord/posts/question"} onClick={onNavigate}>
            <SidebarItem
              icon={() => (
                <SideBarIcons
                  icon={HelpCircle}
                  color={"text-[4b1e8a]"}
                  size={16}
                />
              )}
              className="text-gray-700 font-semibold hover:bg-gray-100 rounded-full  "
            >
              <span className="font-semibold text-sm">الأسئلة</span>
            </SidebarItem>
          </Link>
          <Link to={"/dashbord/posts/new"} onClick={onNavigate}>
            <SidebarItem
              icon={() => (
                <SideBarIcons icon={Globe} color={"text-[4b1e8a]"} size={16} />
              )}
              className="text-gray-700 font-semibold hover:bg-gray-100 rounded-full "
            >
              <span className="font-semibold text-sm">الأخبار</span>
            </SidebarItem>
          </Link>
          <Link to={"/dashbord/posts/work"} onClick={onNavigate}>
            <SidebarItem
              icon={() => (
                <SideBarIcons
                  icon={Briefcase}
                  color={"text-[4b1e8a]"}
                  size={16}
                />
              )}
              className="text-gray-700 font-semibold hover:bg-gray-100 rounded-full "
            >
              <span className="font-semibold text-sm">فرص العمل</span>
            </SidebarItem>
          </Link>
          <Link to={"/dashbord/posts/team"} onClick={onNavigate}>
            <SidebarItem
              icon={() => (
                <SideBarIcons icon={Users} color={"text-[4b1e8a]"} size={16} />
              )}
              className="text-gray-700 font-semibold hover:bg-gray-100 rounded-full "
            >
              <span className="font-semibold text-sm">كون فريق</span>
            </SidebarItem>
          </Link>
          <Link to={"/dashbord/posts/project"} onClick={onNavigate}>
            <SidebarItem
              icon={() => (
                <SideBarIcons
                  icon={FolderKanban}
                  color={"text-[4b1e8a]"}
                  size={16}
                />
              )}
              className="text-gray-700 font-semibold hover:bg-gray-100 rounded-full "
            >
              <span className="font-semibold text-sm">المشاريع</span>
            </SidebarItem>
          </Link>
          <Link to={"/dashbord/posts/users"} onClick={onNavigate}>
            <SidebarItem
              icon={() => (
                <SideBarIcons icon={User2} color={"text-[4b1e8a]"} size={16} />
              )}
              className="text-gray-700 font-semibold hover:bg-gray-100 rounded-full "
            >
              <span className="font-semibold text-sm">قائمة المستخدمين</span>
            </SidebarItem>
          </Link>
        </SidebarItemGroup>

        {/* -------- Bottom Section */}
        <SidebarItemGroup className="mt-auto ">
          <div className="flex justify-center mb-4">
            <img
              src={rabbitSidebar}
              alt="صورة توضيحية"
              className="h-24 w-24 object-contain"
            />
          </div>
          <Link to={"/login"} onClick={onNavigate}>
            <SidebarItem
              icon={() => (
                <SideBarIcons icon={LogOut} color={"text-[4b1e8a]"} size={16} />
              )}
              className="text-gray-700 font-semibold hover:bg-gray-100 rounded-full "
            >
              <span className="font-semibold text-sm">تسجيل الخروج</span>
            </SidebarItem>
          </Link>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
