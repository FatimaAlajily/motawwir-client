import { useState } from "react";
import { deletePostRequest, forceDeletePostRequest } from "../api/PostApi";

const useDeletePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleDeletePost(
    id: number,
    asAdmin: boolean = false
  ): Promise<boolean> {
    setLoading(true);
    setError("");

    const response = asAdmin
      ? await forceDeletePostRequest(id)
      : await deletePostRequest(id);

    setLoading(false);

    if (response.status === "success") {
      return true;
    }

    setError(response.message);
    return false;
  }

  return { loading, error, handleDeletePost };
};

export default useDeletePost;
