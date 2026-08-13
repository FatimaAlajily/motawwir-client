import { useState } from "react";
import { storeVoteRequest } from "../api/VoteApi";
import type { VoteDetails } from "../../../shared/types/VoteDetails";
import type { VoteCustom } from "../types/VoteCustom";

type VoteTarget = {
  type: "post" | "comment";
  id: number;
};

const useVote = ({ type, id }: VoteTarget) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleVote(custom: VoteCustom): Promise<VoteDetails | null> {
    setLoading(true);
    setError("");

    const response = await storeVoteRequest({
      type,
      custom,
      ...(type === "post" ? { post_id: id } : { comment_id: id }),
    });

    setLoading(false);

    if (response.status === "success") {
      return response.data;
    }

    // هنا يتم استقبال رسالة الخطأ من السيرفر (مثلاً "Unauthenticated")
    setError(response.message);
    return null;
  }

  return { loading, error, handleVote };
};

export default useVote;