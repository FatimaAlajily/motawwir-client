"use client";

import { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import SearchBar from "./SearchBar";
import CreateButton from "./CreateButton";
import NotificationBar from "./NotificationBar";
import AvatarBar from "./AvatarBar";
import motawwerLogo from "../../../assets/images/Logo.png";

type NavBarProps = {
  onMenuClick: () => void;
};

export function NavBar({ onMenuClick }: NavBarProps) {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  if (isMobileSearchOpen) {
    return (
      <div className="bg-white px-3 py-2.5 shadow-sm border-b border-gray-100 flex items-center gap-2">
        <div className="flex-1">
          <SearchBar autoFocus />
        </div>
        <button
          type="button"
          onClick={() => setIsMobileSearchOpen(false)}
          className="text-gray-500 hover:text-[#6620F3] transition-colors p-1.5 shrink-0"
          aria-label="إغلاق البحث"
        >
          <X size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white px-3 md:px-6 py-2.5 shadow-sm border-b border-gray-100 flex items-center gap-2 md:gap-4">
      {/* --------------- menu button ------------- */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onMenuClick}
          className="md:hidden text-gray-600 hover:text-[#6620F3] transition-colors p-1"
          aria-label="فتح القائمة"
        >
          <Menu size={22} />
        </button>

        <img
          src={motawwerLogo}
          className="h-7 md:h-9 object-contain"
          alt="مطور"
        />
        <span
          className="hidden lg:block text-2xl font-semibold text-gray-900"
          style={{ fontFamily: '"Reem Kufi", sans-serif' }}
        >
          مطور
        </span>
      </div>

      <div className="flex-1 min-w-0 flex justify-center">
        {/* ----------Search bar ----------------- */}
        <div className="hidden md:block w-full max-w-md">
          <SearchBar />
        </div>

        <button
          type="button"
          onClick={() => setIsMobileSearchOpen(true)}
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
          aria-label="بحث"
        >
          <Search size={18} />
        </button>
      </div>

      <div className="flex items-center gap-1.5 md:gap-3 shrink-0">
        <CreateButton />
        <NotificationBar />
        <AvatarBar />
      </div>
    </div>
  );
}
