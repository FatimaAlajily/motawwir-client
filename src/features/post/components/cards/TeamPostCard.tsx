import type { TeamPost } from "../../types/kinds/TeamPost";

type TeamPostCardProps = {
  post: TeamPost;
};

const TeamPostCard = ({ post }: TeamPostCardProps) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
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
      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{post.content}</p>
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
      href={post.primary_link}
      target="_blank" rel="noopener noreferrer" className="text-sm
      text-[#4b1e8a] hover:underline"
    </div>
  );
};

export default TeamPostCard;
