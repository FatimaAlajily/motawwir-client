import axiosClient from "../../../shared/api/ClientApi";
import { HandleApiError } from "../../../shared/api/HandleApiError";
import type { ApiResponse } from "../types/response/ApiResponse";
import type {
  Comment,
  CommentTarget,
  CreateCommentPayload,
  UpdateCommentPayload,
  PaginatedComments,
} from "../types/comment/Comment";
 
type GetCommentsParams = CommentTarget & { page?: number };
 
export async function getCommentsRequest(
  params: GetCommentsParams
): Promise<ApiResponse<PaginatedComments>> {
  try {
    const response = await axiosClient.get<ApiResponse<PaginatedComments>>(
      "comments",
      { params }
    );
    return response.data;
  } catch (error) {
    return HandleApiError(error);
  }
}
 
export async function createCommentRequest(
  payload: CreateCommentPayload
): Promise<ApiResponse<Comment>> {
  try {
    const response = await axiosClient.post<ApiResponse<Comment>>(
      "comments",
      payload
    );
    return response.data;
  } catch (error) {
    return HandleApiError(error);
  }
}
 
export async function updateCommentRequest(
  id: number,
  payload: UpdateCommentPayload
): Promise<ApiResponse<Comment>> {
  try {
    const response = await axiosClient.put<ApiResponse<Comment>>(
      `comments/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return HandleApiError(error);
  }
}
 
export async function deleteCommentRequest(
  id: number
): Promise<ApiResponse<null>> {
  try {
    const response = await axiosClient.delete<ApiResponse<null>>(
      `comments/${id}`
    );
    return response.data;
  } catch (error) {
    return HandleApiError(error);
  }
}