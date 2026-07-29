import type { Post } from "../../types/common/Post";
import type { PostType } from "../../types/common/PostType";
import QuestionPostCard from "./QuestionPostCard";
import WorkPostCard from "./WorkPostCard";
import NewPostCard from "./NewPostCard";
import ProjectPostCard from "./ProjectPostCard";
import TeamPostCard from "./TeamPostCard";
import { useAuthStore } from "../../../auth/store/useAuthStore";
import PostOptionsMenu from "../ui/PostOptionsMenu";

type PostCardProps = {
  post: Post;
  onDeleted: () => void;
  onEdit: (post: Post) => void;
};

const COL_SPAN_MAP: Record<PostType, string> = {
  question: "col-span-6",
  work: "col-span-6",
  new: "col-span-6",
  project: "col-span-6 md:col-span-3",
  team: "col-span-6 md:col-span-3 lg:col-span-2",
};

const PostCard = ({ post, onDeleted, onEdit }: PostCardProps) => {
  const currentUser = useAuthStore((state) => state.user);
  const isOwner = currentUser?.id === post.user.id;
  const spanClass = COL_SPAN_MAP[post.type] || "col-span-6";

  const menuAction = isOwner ? (
    <PostOptionsMenu
      postId={post.id}
      onDeleted={onDeleted}
      onEdit={() => onEdit(post)}
    />
  ) : null;

  function renderCard() {
    switch (post.type) {
      case "question":
        return (
          <QuestionPostCard
            post={post}
            deleteAction={menuAction}
            isOwner={isOwner} // ✅
          />
        );
      case "work":
        return (
          <WorkPostCard
            post={post}
            deleteAction={menuAction}
            isOwner={isOwner} // ✅
          />
        );
      case "new":
        return (
          <NewPostCard
            post={post}
            deleteAction={menuAction}
            isOwner={isOwner} // ✅
          />
        );
      case "project":
        return (
          <ProjectPostCard
            post={post}
            deleteAction={menuAction}
            isOwner={isOwner} // ✅
          />
        );
      case "team":
        return (
          <TeamPostCard
            post={post}
            deleteAction={menuAction}
            isOwner={isOwner} // ✅
          />
        );
      default:
        return null;
    }
  }

  return <div className={spanClass}>{renderCard()}</div>;
};

export default PostCard;