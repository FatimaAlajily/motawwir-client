import { useState } from "react";
import { updatePostRequest } from "../api/PostApi";
import type { UpdatePostPayload } from "../types/common/CreatePostPayload";
import type { Post } from "../types/common/Post";

const useUpdatePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpdatePost(
    id: number,
    payload: UpdatePostPayload
  ): Promise<Post | null> {
    setLoading(true);
    setError("");

    const response = await updatePostRequest(id, payload);

    setLoading(false);

    if (response.status === "success") {
      return response.data;
    }

    setError(response.message);
    return null;
  }

  return { loading, error, handleUpdatePost };
};

export default useUpdatePost;
