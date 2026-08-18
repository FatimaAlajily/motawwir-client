import { useEffect, useState } from "react";
import { getMessagesRequest } from "../api/ChatApi";
import type { Message } from "../types/Message";
import echo from "../lib/echo";

const useChatMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchMessages() {
      setLoading(true);
      const response = await getMessagesRequest();
      if (cancelled) return;

      if (response.status === "success") {
        setMessages(response.data);
      } else {
        setError(response.message);
      }
      setLoading(false);
    }

    fetchMessages();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const channel = echo.channel("global-chat");

    channel.listen(".message.sent", (event: Message) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === event.id)) return prev;
        return [...prev, event];
      });
    });

    channel.listen(".message.deleted", (event: { id: number }) => {
      setMessages((prev) => prev.filter((m) => m.id !== event.id));
    });

    return () => {
      echo.leaveChannel("global-chat");
    };
  }, []);

  return { messages, setMessages, loading, error };
};

export default useChatMessages;
