import type { User } from "../../types/common/User";
import { Link } from "react-router-dom";

type UserCardProps = {
  user: User;
};

const ROLE_LABELS: Record<string, string> = {
  developer: "مطور",
  company: "شركة",
  client: "عميل",
  admin: "مسؤول",
};

const ROLE_COLORS: Record<string, string> = {
  developer: "#502290",
  company: "#38FFFF",
  client: "#61A343",
  admin: "#EF4444",
};

const UserCard = ({ user }: UserCardProps) => {
  const dotColor = ROLE_COLORS[user.role] || "#502290";

  return (
    <div
      dir="rtl"
      className="bg-[#F4F3F9] border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow w-full flex flex-col justify-between"
      style={{ fontFamily: "'Tajawal', sans-serif" }}
    >
      <div className="flex items-center gap-3.5 mb-4">
        <div className="relative shrink-0">
          <img
            src={user.avatar}
            alt={user.user_name}
            className="w-14 h-14 rounded-full object-cover ring-2 ring-[#9723bb]"
          />
          <span
            className="absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full shadow-sm"
            style={{ backgroundColor: dotColor }}
          />
        </div>

        <div className="flex flex-col text-right overflow-hidden">
          <h3 className="font-bold text-base text-[#33373E] truncate">
            {user.user_name}
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            {ROLE_LABELS[user.role] ?? user.role}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <span className="text-xs text-[#6B737C]">
          السمعة:{" "}
          <strong className="text-sm text-[#6620F3] font-bold">
            {user.votra ?? 0}
          </strong>
        </span>

        <Link
          to={`/profile/${user.id}`}
          className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-1.5 rounded-full text-xs font-medium transition-colors shadow-sm shadow-violet-100 inline-block text-center"
        >
          الحساب الشخصي
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
