import type { Post } from "../../types/common/Post";
import NewPostCard from "./NewPostCard";
import ProjectPostCard from "./ProjectPostCard";
import QuestionPostCard from "./QuestionPostCard";
import TeamPostCard from "./TeamPostCard";
import WorkPostCard from "./WorkPostCard";

type PostCardProps = {
  post: Post;
};

const PostCard = ({ post }: PostCardProps) => {
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
};

export default PostCard;
