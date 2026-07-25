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

import Logo from "../../../assets/images/Logo.png";
import SideBarIcons from "../common/SideBarIcons";
export function SideBar() {
  return (
    <Sidebar
      aria-label="نافذة الاقسام"
      className="bg-white [&>div]:bg-white [&>div]:border-none rounded-l-2xl min-h-screen py-4 shadow-sm"
    >
      {/* ---------- Motawwer */}
      <div className="flex items-center gap-3 px-4 mb-6">
        <img
          src={Logo}
          alt="Motaweer Logo"
          className="w-[38] h-[33] object-contain"
        />
        <span
          className="text-xl font-bold text-gray-900"
          style={{ fontFamily: '"Reem Kufi", sans-serif' }}
        >
          مطور
        </span>
      </div>
      <SidebarItems>
        <SidebarItemGroup className="space-y-1.5">
          <SidebarItem
            href="#"
            icon={() => (
              <SideBarIcons icon={Home} color={"text-[4b1e8a]"} size={16} />
            )}
            className="bg-[#e5e5f8] text-[#4b1e8a] font-semibold rounded-full hover:bg-[#e5e5f8]"
          >
            <span className="font-semibold text-sm text-[#4b1e8a]">
              الصفحة الرئيسية
            </span>
          </SidebarItem>
          <SidebarItem
            href="#"
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
          <SidebarItem
            href="#"
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
          <SidebarItem
            href="#"
            icon={() => (
              <SideBarIcons icon={Globe} color={"text-[4b1e8a]"} size={16} />
            )}
            className="text-gray-700 font-semibold hover:bg-gray-100 rounded-full "
          >
            <span className="font-semibold text-sm">الأخبار</span>
          </SidebarItem>
          <SidebarItem
            href="#"
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
          <SidebarItem
            href="#"
            icon={() => (
              <SideBarIcons icon={Users} color={"text-[4b1e8a]"} size={16} />
            )}
            className="text-gray-700 font-semibold hover:bg-gray-100 rounded-full "
          >
            <span className="font-semibold text-sm">كون فريق</span>
          </SidebarItem>
          <SidebarItem
            href="#"
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
        </SidebarItemGroup>
        <SidebarItemGroup>
          <SidebarItem
            href="#"
            icon={() => (
              <SideBarIcons icon={LogOut} color={"text-[4b1e8a]"} size={16} />
            )}
            className="text-gray-700 font-semibold hover:bg-gray-100 rounded-full "
          >
            <span className="font-semibold text-sm">تسجيل الخروج</span>
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
