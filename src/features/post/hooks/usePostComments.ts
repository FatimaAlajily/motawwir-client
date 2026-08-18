import { useState } from "react";
import { useAuthStore } from "../../auth/store/useAuthStore";

export function usePostComments(postId: number) {
  const [show, setShow] = useState(false);
  const currentUser = useAuthStore((state) => state.user);

  return {
    show,
    toggle: () => setShow((prev) => !prev),
    target: { type: "post" as const, post_id: postId },
    currentUserId: currentUser?.id,
  };
}