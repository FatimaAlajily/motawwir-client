import echo from "../../chat/lib/echo";
import type { AppNotification } from "../types/AppNotification";

let currentChannelName: string | null = null;
let currentHandler: ((event: AppNotification) => void) | null = null;

export function subscribeToNotifications(
  userId: number,
  onNotification: (event: AppNotification) => void
) {
  const channelName = `notifications.${userId}`;

  if (currentChannelName === channelName) {
    if (currentHandler) {
      echo
        .private(channelName)
        .stopListening(".notification.sent", currentHandler);
    }
    currentHandler = onNotification;
    echo.private(channelName).listen(".notification.sent", currentHandler);
    return;
  }

  if (currentChannelName) {
    echo.leave(currentChannelName);
  }

  currentChannelName = channelName;
  currentHandler = onNotification;
  echo.private(channelName).listen(".notification.sent", currentHandler);
}
