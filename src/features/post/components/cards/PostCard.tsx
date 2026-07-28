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

// ✅ تعديل الأحجام لتكون متجاوبة (على الجوال تأخذ العرض الكامل 6)
const COL_SPAN_MAP: Record<PostType, string> = {
  question: "col-span-6", // العرض الكامل دائماً
  work: "col-span-6", // العرض الكامل دائماً
  new: "col-span-6", // العرض الكامل دائماً
  project: "col-span-6 md:col-span-3", // جوال: كامل / تابلت وأعلى: نصف العرض (بطاقتين)
  team: "col-span-6 md:col-span-3 lg:col-span-2", // جوال: كامل / تابلت: نصف العرض / كمبيوتر: ثلث العرض (3 بطاقات)
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
        return <QuestionPostCard post={post} deleteAction={menuAction} />;
      case "work":
        return <WorkPostCard post={post} deleteAction={menuAction} />;
      case "new":
        return <NewPostCard post={post} deleteAction={menuAction} />;
      case "project":
        return <ProjectPostCard post={post} deleteAction={menuAction} />;
      case "team":
        return <TeamPostCard post={post} deleteAction={menuAction} />;
      default:
        return null;
    }
  }

  return <div className={spanClass}>{renderCard()}</div>;
};

export default PostCard;
