import type { ProjectPost } from "../../types/kinds/ProjectPost";

type ProjectPostCardProps = {
  post: ProjectPost;
};

const ProjectPostCard = ({ post }: ProjectPostCardProps) => {
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
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {post.content}
        </p>

        <div className="flex flex-wrap gap-2 mb-3">
          {post.skill.map((s) => (
            <span
              key={s}
              className="bg-[#e5e5f8] text-[#4b1e8a] text-xs font-semibold px-2.5 py-1 rounded-full"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 text-sm"></div>

        <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
          <span>▲ {post.votes.upvotes}</span>
          <span>▼ {post.votes.downvotes}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectPostCard;
