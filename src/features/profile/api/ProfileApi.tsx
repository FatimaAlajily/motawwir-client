import axiosClient from "../../../shared/api/ClientApi";
import { HandleApiError } from "../../../shared/api/HandleApiError";
import type { ApiResponse } from "../../profile/types/response/ApiResponse";
import type { ApiSuccess } from "../../profile/types/response/ApiSuccess";
import type {
  Profile,
  UpdateProfilePayload,
} from "../types/user/Profile";

export async function getProfileRequest(): Promise<ApiResponse<Profile>> {
  try {
    const response = await axiosClient.get<ApiSuccess<Profile>>("profile");
    return response.data;
  } catch (error) {
    return HandleApiError(error);
  }
}

export async function updateProfileRequest(
  payload: UpdateProfilePayload
): Promise<ApiResponse<Profile>> {
  try {
    const formData = new FormData();
    // formData.append("_method", "PUT");

    Object.entries(payload).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (key === "skill" && Array.isArray(value)) {
        value.forEach((skill) => formData.append("skill[]", skill));
        return;
      }

      if (value instanceof File) {
        formData.append(key, value);
        return;
      }

      formData.append(key, String(value));
    });

    const response = await axiosClient.post<ApiSuccess<Profile>>(
      "profile",
      formData
    );

    return response.data;
  } catch (error) {
    return HandleApiError(error);
  }
}