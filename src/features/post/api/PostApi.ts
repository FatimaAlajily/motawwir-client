import axiosClient from "../../../shared/api/ClientApi";
import type { PostType } from "../types/common/PostType";
import type { PostPagination } from "../types/forms/PostPagination";
import type { Post } from "../types/common/Post";
import { HandleApiError } from "../../../shared/api/HandleApiError";
import type { ApiSuccess } from "../../auth/types/response/ApiSuccess";
import type {
  CreatePostPayload,
  UpdatePostPayload,
} from "../types/common/CreatePostPayload";
import type { ApiResponse } from "../../auth/types/response/ApiResponse";

function buildPostFormData(
  payload: Record<string, unknown>,
  method?: "PUT"
): FormData {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (key === "skill" && Array.isArray(value)) {
      value.forEach((item) => formData.append("skill[]", item as string));
      return;
    }

    if (key === "file" && value instanceof File) {
      formData.append("file", value);
      return;
    }

    formData.append(key, String(value));
  });

  if (method === "PUT") {
    formData.append("_method", "PUT");
  }

  return formData;
}

// ----------------- Requests -----------------

export async function getPostsRequest(params?: {
  type?: PostType;
  search?: string;
  page?: number;
  user_id?: number; // فلترة منشورات مستخدم معيّن (تستخدم بتاب "آخر المنشورات" بالبروفايل)
}): Promise<PostPagination<Post> | { status: "error"; message: string }> {
  try {
    const response = await axiosClient.get<PostPagination<Post>>("posts", {
      params,
    });
    return response.data;
  } catch (error) {
    return HandleApiError(error) as { status: "error"; message: string };
  }
}

export async function getPostRequest(id: number): Promise<ApiResponse<Post>> {
  try {
    const response = await axiosClient.get<ApiSuccess<Post>>(`posts/${id}`);
    return response.data;
  } catch (error) {
    return HandleApiError(error);
  }
}

export async function createPostRequest(
  payload: CreatePostPayload
): Promise<ApiResponse<Post>> {
  try {
    const hasFile = "file" in payload;

    const response = hasFile
      ? await axiosClient.post<ApiSuccess<Post>>(
          "posts",
          buildPostFormData(payload as unknown as Record<string, unknown>)
        )
      : await axiosClient.post<ApiSuccess<Post>>("posts", payload);

    return response.data;
  } catch (error) {
    return HandleApiError(error);
  }
}

export async function updatePostRequest(
  id: number,
  payload: UpdatePostPayload
): Promise<ApiResponse<Post>> {
  try {
    const hasFile = payload.file instanceof File;

    const response = hasFile
      ? await axiosClient.post<ApiSuccess<Post>>(
          `posts/${id}`,
          buildPostFormData(
            payload as unknown as Record<string, unknown>,
            "PUT"
          )
        )
      : await axiosClient.put<ApiSuccess<Post>>(`posts/${id}`, payload);

    return response.data;
  } catch (error) {
    return HandleApiError(error);
  }
}

export async function deletePostRequest(
  id: number
): Promise<ApiResponse<null>> {
  try {
    const response = await axiosClient.delete<ApiSuccess<null>>(`posts/${id}`);
    return response.data;
  } catch (error) {
    return HandleApiError(error);
  }
}

export async function forceDeletePostRequest(
  id: number
): Promise<ApiResponse<{ id: number }>> {
  try {
    const response = await axiosClient.delete<ApiSuccess<{ id: number }>>(
      `admin/moderation/posts/${id}`
    );
    return response.data;
  } catch (error) {
    return HandleApiError(error);
  }
}

export async function toggleSavePostRequest(
  id: number
): Promise<ApiResponse<{ saved: boolean }>> {
  try {
    const response = await axiosClient.post<ApiSuccess<{ saved: boolean }>>(
      `posts/${id}/save`
    );
    return response.data;
  } catch (error) {
    return HandleApiError(error);
  }
}

export async function getSavedPostsRequest(params?: {
  page?: number;
}): Promise<PostPagination<Post> | { status: "error"; message: string }> {
  try {
    const response = await axiosClient.get<PostPagination<Post>>(
      "saved-posts",
      { params }
    );
    return response.data;
  } catch (error) {
    return HandleApiError(error) as { status: "error"; message: string };
  }
}
