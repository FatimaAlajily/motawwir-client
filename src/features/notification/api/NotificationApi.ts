import axiosClient from "../../../shared/api/ClientApi";
import type { ApiResponse } from "../../auth/types/response/ApiResponse";
import type { ApiSuccess } from "../../auth/types/response/ApiSuccess";
import type { PostPagination } from "../../post/types/forms/PostPagination";
import { HandleApiError } from "../../../shared/api/HandleApiError";
import type { AppNotification } from "../types/AppNotification";

export async function getNotificationsRequest(params?: {
  type?: "vote" | "comment";
  is_read?: boolean;
}): Promise<
  PostPagination<AppNotification> | { status: "error"; message: string }
> {
  try {
    const response = await axiosClient.get<PostPagination<AppNotification>>(
      "notifications",
      { params }
    );
    return response.data;
  } catch (error) {
    return HandleApiError(error) as { status: "error"; message: string };
  }
}

export async function getUnreadCountRequest(): Promise<
  ApiResponse<{ count: number }>
> {
  try {
    const response = await axiosClient.get<ApiSuccess<{ count: number }>>(
      "notifications/unread-count"
    );
    return response.data;
  } catch (error) {
    return HandleApiError(error);
  }
}

export async function markAsReadRequest(
  id: number
): Promise<ApiResponse<AppNotification>> {
  try {
    const response = await axiosClient.post<ApiSuccess<AppNotification>>(
      `notifications/${id}/read`
    );
    return response.data;
  } catch (error) {
    return HandleApiError(error);
  }
}

export async function markAllAsReadRequest(): Promise<ApiResponse<null>> {
  try {
    const response = await axiosClient.post<ApiSuccess<null>>(
      "notifications/read-all"
    );
    return response.data;
  } catch (error) {
    return HandleApiError(error);
  }
}
