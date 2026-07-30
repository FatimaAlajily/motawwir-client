import { useState } from "react";
import { Bell } from "lucide-react";
import useNotifications from "../../../features/notification/hooks/useNotifications";
import { formatDate } from "../../../shared/utils/formatDate";
import type { AppNotification } from "../types/AppNotification";

function buildNotificationText(notification: AppNotification): string {
  const name = notification.from_user.user_name;

  if (notification.type === "vote") {
    const customLabel =
      notification.vote?.custom === "upvote"
        ? "صوّت إيجابيًا"
        : notification.vote?.custom === "downvote"
          ? "صوّت سلبيًا"
          : "قيّم بالذكاء الاصطناعي";
    return `${name} ${customLabel} على منشورك`;
  }

  return `${name} علّق على منشورك`;
}

const NotificationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, loading, markAsRead, markAllAsRead } =
    useNotifications();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative text-gray-500 hover:text-[#6620F3] transition-colors p-1.5"
        aria-label="الإشعارات"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -left-0.5 flex items-center justify-center min-w-4 h-4 px-1 rounded-full bg-red-500 text-white text-[10px] font-bold">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
      )}

      {isOpen && (
        <div
          dir="rtl"
          className="absolute left-0 top-full mt-2 w-80 max-h-96 overflow-y-auto bg-white border border-gray-100 rounded-xl shadow-lg z-20"
          style={{ fontFamily: "'Tajawal', sans-serif" }}
        >
          <div className="flex items-center justify-between px-3 py-2.5 border-b border-gray-100">
            <span className="text-sm font-bold text-gray-800">الإشعارات</span>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="text-[11px] font-semibold text-[#6620F3] hover:underline"
              >
                تعليم الكل كمقروء
              </button>
            )}
          </div>

          {loading ? (
            <p className="text-center text-xs text-gray-400 py-6">
              جاري التحميل...
            </p>
          ) : notifications.length === 0 ? (
            <p className="text-center text-xs text-gray-400 py-6">
              لا توجد إشعارات حتى الآن
            </p>
          ) : (
            notifications.map((notification) => (
              <button
                key={notification.id}
                type="button"
                onClick={() =>
                  !notification.is_read && markAsRead(notification.id)
                }
                className={`flex items-start gap-2.5 w-full px-3 py-2.5 text-right hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 ${
                  !notification.is_read ? "bg-[#f5f2ff]" : ""
                }`}
              >
                <img
                  src={notification.from_user.avatar}
                  alt={notification.from_user.user_name}
                  className="w-8 h-8 rounded-full object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-700 leading-snug">
                    {buildNotificationText(notification)}
                  </p>
                  <span className="text-[10px] text-gray-400">
                    {formatDate(notification.created_at)}
                  </span>
                </div>
                {!notification.is_read && (
                  <span className="w-2 h-2 rounded-full bg-[#6620F3] shrink-0 mt-1" />
                )}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBar;
