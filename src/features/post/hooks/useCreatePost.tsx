import { useState } from "react";
import { createPostRequest } from "../api/PostApi";
import type { CreatePostPayload } from "../types/common/CreatePostPayload";
import type { Post } from "../types/common/Post";

const useCreatePost = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function handleCreatePost(
    payload: CreatePostPayload
  ): Promise<Post | null> {
    setLoading(true);
    setError("");

    const response = await createPostRequest(payload);

    setLoading(false);

    if (response.status === "success") {
      return response.data;
    }

    setError(response.message);
    return null;
  }

  return {
    loading,
    error,
    handleCreatePost,
  };
};

export default useCreatePost;
