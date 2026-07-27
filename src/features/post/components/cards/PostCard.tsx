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

const FULL_WIDTH_TYPES: PostType[] = ["question", "work"];

const PostCard = ({ post }: PostCardProps) => {
  const isFullWidth = FULL_WIDTH_TYPES.includes(post.type);
  const spanClass = isFullWidth ? "col-span-2" : "col-span-1";

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
    }
  }

  return <div className={spanClass}>{renderCard()}</div>;
};

export default PostCard;
