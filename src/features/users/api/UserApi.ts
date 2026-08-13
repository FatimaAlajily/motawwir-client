import axiosClient from "../../../shared/api/ClientApi";
import { HandleApiError } from "../../../shared/api/HandleApiError";
import type { User } from "../types/common/User";
import type { UserType } from "../types/common/UserType";
import type { UserPagination } from "../types/forms/UserPagination";

export async function getUsersRequest(params?: {
  role?: UserType;
  search?: string;
  page?: number;
}): Promise<UserPagination<User> | { status: "error"; message: string }> {
  try {
    const response = await axiosClient.get<UserPagination<User>>("users", {
      params,
    });
    return response.data;
  } catch (error) {
    return HandleApiError(error) as { status: "error"; message: string };
  }
}

// ✅ إضافة دالة تسجيل الخروج هنا
export async function logoutRequest() {
  try {
    const response = await axiosClient.post("logout");
    return response.data;
  } catch (error) {
    return HandleApiError(error);
  }
}