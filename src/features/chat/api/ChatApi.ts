import type { Message } from "../types/Message";
import type { ApiResponse } from "../../auth/types/response/ApiResponse";
import axiosClient from "../../../shared/api/ClientApi";
import { isAxiosError } from "axios";

function extractErrorMessage(error: unknown, fallback: string): string {
  if (isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? fallback;
  }
  return fallback;
}

// دالة مساعدة لجلب الـ Socket ID وإضافته للهيدر
function getSocketIdHeader() {
  const socketId = window.Echo?.socketId();
  return socketId ? { "X-Socket-ID": socketId } : {};
}

export async function getMessagesRequest(): Promise<ApiResponse<Message[]>> {
  try {
    const response = await axiosClient.get("/messages");
    const raw = response.data;
    const data: Message[] = Array.isArray(raw) ? raw : (raw.data ?? []);

    return {
      status: "success",
      message: "Messages fetched",
      data,
    };
  } catch (error) {
    return {
      status: "error",
      message: extractErrorMessage(error, "Failed to fetch messages"),
    };
  }
}

export async function sendMessageRequest(
  message: string
): Promise<ApiResponse<Message>> {
  try {
    // ✅ إضافة الـ X-Socket-ID للهيدر
    const response = await axiosClient.post(
      "chat/messages",
      { message },
      { headers: getSocketIdHeader() }
    );
    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: extractErrorMessage(error, "Failed to send message"),
    };
  }
}

export async function deleteMessageRequest(
  id: number
): Promise<ApiResponse<{ id: number }>> {
  try {
    // ✅ إضافة الـ X-Socket-ID للهيدر
    const response = await axiosClient.delete(`chat/messages/${id}`, {
      headers: getSocketIdHeader(),
    });
    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: extractErrorMessage(error, "Failed to delete message"),
    };
  }
}
