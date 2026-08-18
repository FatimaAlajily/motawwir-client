import type { User } from "../../types/common/User";
import { Link } from "react-router-dom";
import UserOptionsMenu from "../ui/UserOptionsMenu";

type UserCardProps = {
  user: User;
  isCurrentUserAdmin: boolean;
  onBanStatusChange: (userId: number, isBanned: boolean) => void;
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

const UserCard = ({
  user,
  isCurrentUserAdmin,
  onBanStatusChange,
}: UserCardProps) => {
  const dotColor = ROLE_COLORS[user.role] || "#502290";

  return (
    <div
      dir="rtl"
      className={`bg-[#F4F3F9] border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow w-full flex flex-col justify-between min-h-40 relative ${
        user.is_banned ? "opacity-60" : ""
      }`}
      style={{ fontFamily: "'Tajawal', sans-serif" }}
    >
      {user.is_banned && (
        <span className="absolute top-2 left-2 bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
          محظور
        </span>
      )}
      <div className="flex items-center gap-3.5 mb-4">
        <div className="relative shrink-0">
          <img
            // [التعديل هنا]: استخدام رابط الصورة المباشر أو التأكد من توفره بشكل آمن
            src={user.avatar ? user.avatar : "/default-avatar.png"}
            alt={user.user_name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-[#9723bb]"
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

      <div className="flex items-center justify-between pt-2 gap-2">
        <span className="text-xs text-[#6B737C]">
          السمعة:{" "}
          <strong className="text-sm text-[#6620F3] font-bold">
            {user.votra ?? 0}
          </strong>
        </span>

        <div className="flex items-center">
          <Link
            to={`/profile/${user.id}`}
            className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-1.5 rounded-full text-xs font-medium transition-colors shadow-sm shadow-violet-100 inline-block text-center whitespace-nowrap shrink-0"
          >
            الحساب
          </Link>

          {isCurrentUserAdmin && (
            <UserOptionsMenu
              userId={user.id}
              isBanned={!!user.is_banned}
              onStatusChange={onBanStatusChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;