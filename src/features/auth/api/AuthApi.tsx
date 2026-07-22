import axiosClient from "../../../shared/api/ClientApi";
import type { User } from "../types/user/User";
import type { Login } from "../types/user/Login";
import type { Register } from "../types/user/Register";
import type { ApiResponse } from "../types/response/ApiResponse";
import type { ApiSuccess } from "../types/response/ApiSuccess";
import { HandleApiError } from "../../../shared/api/HandleApiError";

export async function loginRequest(payload: Login): Promise<ApiResponse<User>> {
  try {
    const response = await axiosClient.post<ApiSuccess<User>>(
      "api/auth/login",
      payload
    );
    return response.data;
  } catch (error) {
    return HandleApiError(error);
  }
}

export async function registerRequest(
  payload: Register
): Promise<ApiResponse<User>> {
  try {
    const response = await axiosClient.post<ApiSuccess<User>>(
      "/api/auth/register",
      payload
    );
    return response.data;
  } catch (error) {
    return HandleApiError(error);
  }
}
export async function logoutRequest(): Promise<ApiResponse<null>> {
  try {
    const response = await axiosClient.post<ApiSuccess<null>>("api/logout");
    return response.data;
  } catch (error) {
    return HandleApiError(error);
  }
}
