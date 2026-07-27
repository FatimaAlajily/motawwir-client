import type { Post } from "../../types/common/Post";
import type { PostType } from "../../types/common/PostType";
import QuestionPostCard from "./QuestionPostCard";
import WorkPostCard from "./WorkPostCard";
import NewPostCard from "./NewPostCard";
import ProjectPostCard from "./ProjectPostCard";
import TeamPostCard from "./TeamPostCard";

type PostCardProps = {
  post: Post;
};

// تحديث القيم لتتوافق مع شبكة الـ 6 أعمدة
const COL_SPAN_MAP: Record<PostType, string> = {
  question: "col-span-6", // العرض الكامل (بطاقة واحدة في السطر)
  work: "col-span-6", // العرض الكامل
  new: "col-span-6", // العرض الكامل
  project: "col-span-3", // نصف العرض (بطاقتين في السطر)
  team: "col-span-2", // نصف العرض (بطاقتين في السطر)
};

const PostCard = ({ post }: PostCardProps) => {
  const spanClass = COL_SPAN_MAP[post.type] || "col-span-6";

  function renderCard() {
    switch (post.type) {
      case "question":
        return <QuestionPostCard post={post} />;
      case "work":
        return <WorkPostCard post={post} />;
      case "new":
        return <NewPostCard post={post} />;
      case "project":
        return <ProjectPostCard post={post} />;
      case "team":
        return <TeamPostCard post={post} />;
      default:
        return null;
    }
  }

  return <div className={spanClass}>{renderCard()}</div>;
};

export default PostCard;
