import { useState } from "react";
import CommentSection from "../../../comment/components/common/CommentSection"; 
import { useAuthStore } from "../../../auth/store/useAuthStore";

type PostCommentsProps = {
  postId: number;
};

const PostComments = ({ postId }: PostCommentsProps) => {
  const [show, setShow] = useState(false);
  const currentUser = useAuthStore((state) => state.user);

  return {
    show,
    toggle: () => setShow((prev) => !prev),
    render: show && (
      <>
        <hr className="border-gray-100 my-2" />
        <CommentSection
          target={{ type: "post", post_id: postId }}
          currentUserId={currentUser?.id}
        />
      </>
    ),
  };
};

export default PostComments;