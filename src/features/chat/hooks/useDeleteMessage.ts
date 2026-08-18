import { useState } from "react";
import {
  deleteMessageRequest,
  forceDeleteMessageRequest,
} from "../api/ChatApi";

const useDeleteMessage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete(
    id: number,
    asAdmin: boolean = false
  ): Promise<boolean> {
    setLoading(true);
    setError("");

    const response = asAdmin
      ? await forceDeleteMessageRequest(id)
      : await deleteMessageRequest(id);

    setLoading(false);

    if (response.status === "success") {
      return true;
    }

    setError(response.message);
    return false;
  }

  return { loading, error, handleDelete };
};

export default useDeleteMessage;
