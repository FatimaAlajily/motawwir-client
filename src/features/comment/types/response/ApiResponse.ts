import type { ApiSuccess } from "./ApiSuccess";
import type { ApiError } from "./ApiError";
 
export type ApiResponse<T> = ApiSuccess<T> | ApiError;
