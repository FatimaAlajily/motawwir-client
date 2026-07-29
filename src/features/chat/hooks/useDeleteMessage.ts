import { useState } from "react";
import { deleteMessageRequest } from "../api/ChatApi";

const useDeleteMessage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete(id: number): Promise<boolean> {
    setLoading(true);
    setError("");

    const response = await deleteMessageRequest(id);

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
