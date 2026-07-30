import { useEffect, useState } from "react";
import {
  getNotificationsRequest,
  getUnreadCountRequest,
  markAsReadRequest,
  markAllAsReadRequest,
} from "../api/NotificationApi";
import { useAuthStore } from "../../auth/store/useAuthStore";
import type { AppNotification } from "../types/AppNotification";
import echo from "../../chat/lib/echo";

const useNotifications = () => {
  const currentUser = useAuthStore((state) => state.user);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!currentUser) return;
    let cancelled = false;

    async function fetchAll() {
      setLoading(true);

      const [listResponse, countResponse] = await Promise.all([
        getNotificationsRequest(),
        getUnreadCountRequest(),
      ]);

      if (cancelled) return;

      if ("data" in listResponse) {
        setNotifications(listResponse.data);
      } else {
        setError(listResponse.message);
      }

      if (countResponse.status === "success") {
        setUnreadCount(countResponse.data.count);
      }

      setLoading(false);
    }

    fetchAll();

    return () => {
      cancelled = true;
    };
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;

    const channel = echo.private(`notifications.${currentUser.id}`);

    channel.listen(".notification.sent", (event: AppNotification) => {
      setNotifications((prev) => [event, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    return () => {
      echo.leave(`notifications.${currentUser.id}`);
    };
  }, [currentUser]);

  async function markAsRead(id: number) {
    const response = await markAsReadRequest(id);
    if (response.status === "success") {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
      setUnreadCount((prev) => Math.max(prev - 1, 0));
    }
  }

  async function markAllAsRead() {
    const response = await markAllAsReadRequest();
    if (response.status === "success") {
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
      setUnreadCount(0);
    }
  }

  return {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    markAllAsRead,
  };
};

export default useNotifications;
