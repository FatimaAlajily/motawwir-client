import { Bell } from "lucide-react";

const NotificationBar = () => {
  return (
    <button className="relative p-3 text-[#5C45A4] hover:text-[#4b1e8a] transition-colors">
      <Bell className="w-4 h-4" />

      <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full ring-2 ring-white"></span>
    </button>
  );
};

export default NotificationBar;
