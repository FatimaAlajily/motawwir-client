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
  // UserCheck,
  LogOut,
} from "lucide-react";

import SideBarIcons from "../common/SideBarIcons";
import { Link } from "react-router-dom";
export function SideBar() {
  return (
    <Sidebar
      aria-label="نافذة الاقسام"
      className="bg-white [&>div]:bg-white [&>div]:border-none rounded-l-2xl min-h-screen pt-1 pb-4 shadow-sm"
    >
      <SidebarItems>
        <SidebarItemGroup className="space-y-1.5 mt-6">
          <Link to={"/dashbord"}>
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
          <Link to={"/dashbord/chat"}>
            <SidebarItem
              icon={() => (
                <SideBarIcons
                  icon={MessageSquare}
                  color={"text-[4b1e8a]"}
                  size={16}
                />
              )}
              className="text-gray-700 font-semibold hover:bg-gray-100 rounded-full "
            >
              <span className="font-semibold text-sm">الدردشة العالمية</span>
            </SidebarItem>
          </Link>
          <Link to={"/dashbord/posts/question"}>
            <SidebarItem
              icon={() => (
                <SideBarIcons
                  icon={HelpCircle}
                  color={"text-[4b1e8a]"}
                  size={16}
                />
              )}
              className="text-gray-700 font-semibold hover:bg-gray-100 rounded-full "
            >
              <span className="font-semibold text-sm">الأسئلة</span>
            </SidebarItem>
          </Link>
          <Link to={"/dashbord/posts/new"}>
            <SidebarItem
              icon={() => (
                <SideBarIcons icon={Globe} color={"text-[4b1e8a]"} size={16} />
              )}
              className="text-gray-700 font-semibold hover:bg-gray-100 rounded-full "
            >
              <span className="font-semibold text-sm">الأخبار</span>
            </SidebarItem>
          </Link>
          <Link to={"/dashbord/posts/work"}>
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
          <Link to={"/dashbord/posts/team"}>
            <SidebarItem
              icon={() => (
                <SideBarIcons icon={Users} color={"text-[4b1e8a]"} size={16} />
              )}
              className="text-gray-700 font-semibold hover:bg-gray-100 rounded-full "
            >
              <span className="font-semibold text-sm">كون فريق</span>
            </SidebarItem>
          </Link>
          <Link to={"/dashbord/posts/project"}>
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
        </SidebarItemGroup>
        <SidebarItemGroup>
          <Link to={"/login"}>
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
