import type { PostType } from "../types/PostType";
import { POST_TYPE_CONFIG } from "../types/postTypeConfig";

type PostTypeSelectorProps = {
  onSelect: (type: PostType) => void;
};

const PostTypeSelector = ({ onSelect }: PostTypeSelectorProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-2">
      {POST_TYPE_CONFIG.map(({ type, label, icon: Icon }) => (
        <button
          key={type}
          type="button"
          onClick={() => onSelect(type)}
          className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border border-gray-200 hover:bg-[#e5e5f8] hover:border-[#4b1e8a] transition-colors group"
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#e5e5f8] group-hover:bg-white transition-colors">
            <Icon size={22} className="text-[#4b1e8a]" />
          </div>
          <span className="text-sm font-semibold text-gray-700 group-hover:text-[#4b1e8a]">
            {label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default PostTypeSelector;
