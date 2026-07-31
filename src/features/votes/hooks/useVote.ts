import { useState } from "react";
import { storeVoteRequest } from "../api/VoteApi";
import type { VoteDetails } from "../../../shared/types/VoteDetails";
import type { VoteCustom } from "../types/VoteCustom";

const useVote = (postId: number) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleVote(custom: VoteCustom): Promise<VoteDetails | null> {
    setLoading(true);
    setError("");

    const response = await storeVoteRequest({
      type: "post",
      custom,
      post_id: postId,
    });

    setLoading(false);

    if (response.status === "success") {
      return response.data;
    }

    setError(response.message);
    return null;
  }

  return { loading, error, handleVote };
};

export default useVote;