import { useState } from "react";
import { sendMessageRequest } from "../api/ChatApi";
import type { Message } from "../types/Message";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSend(message: string): Promise<Message | null> {
    if (!message.trim()) return null;

    setLoading(true);
    setError("");

    const response = await sendMessageRequest(message);

    setLoading(false);

    if (response.status === "success" && response.data) {
      return response.data;
    }

    setError(response.message);
    return null;
  }

  return { loading, error, handleSend };
};

export default useSendMessage;
