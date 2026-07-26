import type { NewPost } from "../../types/kinds/NewPost";

type NewPostCardProps = {
  post: NewPost;
};

const NewPostCard = ({ post }: NewPostCardProps) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {post.file && (
        <img
          src={post.file}
          alt={post.title}
          className="w-full h-40 object-cover"
        />
      )}

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <img
            src={post.user.avatar}
            alt={post.user.user_name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm font-semibold text-gray-700">
            {post.user.user_name}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-1">{post.title}</h3>
      </div>
    </div>
  );
};

export default NewPostCard;
