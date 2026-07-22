import { AxiosError } from "axios";
import type { ApiError } from "../../features/auth/types/response/ApiError";

export function HandleApiError(error: unknown): ApiError {
  if (error instanceof AxiosError && error.response?.data) {
    return error.response.data as ApiError;
  }
  return {
    status: "error",
    message: "حدث خطأ غير متوقع ، حاول مرة اخرى",
  };
}
