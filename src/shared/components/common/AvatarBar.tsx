import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
} from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../features/auth/store/useAuthStore";

const AvatarBar = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  if (!user) {
    return (
      <button
        onClick={() => navigate("/login")}
        className="text-xs font-bold text-[#6620F3] bg-[#F4F0FF] px-4 py-2 rounded-full hover:bg-[#E5DEFF] transition-colors"
      >
        تسجيل الدخول
      </button>
    );
  }

  return (
    <Dropdown
      arrowIcon={false}
      inline
      style={{ fontFamily: "'Tajawal', sans-serif" }}
      label={
        <div className="relative">
          <Avatar
            alt="حساب المستخدم"
            img={user?.avatar}
            rounded
            className="ring-1 rounded-full ring-[#5C45A4] hover:grayscale-20"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-purple-700 border-2 border-white rounded-full"></span>
        </div>
      }
    >
      <DropdownHeader>
        <span className="block text-sm font-bold">{user?.user_name}</span>
        <span className="block truncate text-sm font-medium text-gray-500">
          {user?.email}
        </span>
      </DropdownHeader>

      <DropdownDivider />

      <DropdownItem
        className="text-mutted font-bold cursor-pointer"
        onClick={() => navigate(`/profile/${user?.id}`)}
      >
        حساب المستخدم
      </DropdownItem>

      <DropdownItem
        className="text-red-600"
        onClick={() => {
          useAuthStore.getState().logout();
          navigate("/");
        }}
      >
        تسجيل الخروج
      </DropdownItem>
    </Dropdown>
  );
};

export default AvatarBar;
