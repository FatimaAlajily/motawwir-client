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

import SideBarIcons from "../common/SideBarIcons";
import rabbitSidebar from "../../../assets/images/rabbit-sidebar.png";
import { Link } from "react-router-dom";

export function SideBar() {
  return (
    <Sidebar
      aria-label="نافذة الاقسام"
      // ✅ استخدمنا min-h-full بدلاً من h-full لكي يسمح للعناصر بالتمدد وللـ flex بدفع العناصر للأسفل
      className="bg-white [&>div]:bg-white [&>div]:border-none rounded-l-2xl pt-1 pb-4 shadow-sm min-h-full flex flex-col"
    >
      <SidebarItems className="flex flex-col flex-1 min-h-full">
        {/* المجموعة الأولى تأخذ flex-1 لتدفع الباقي للأسفل */}
        <SidebarItemGroup className="space-y-1.5 mt-6 flex-1">
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
          <Link to={"/dashbord/posts/users"}>
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

        {/* المجموعة السفلية تبقى في الأسفل دائماً */}
        {/* ✅ أضفنا shrink-0 لمنعها من التقلص */}
        <SidebarItemGroup className="mt-auto shrink-0">
          <div className="flex justify-center mb-4">
            <img
              src={rabbitSidebar}
              alt="صورة توضيحية"
              className="h-24 w-24 object-contain"
            />
          </div>
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
