import type { PostType } from "../../types/common/PostType";
import { POST_TYPE_CONFIG } from "../../types/common/postTypeConfig";

type PostTypeSelectorProps = {
  onSelect: (type: PostType) => void;
};

// هذ مكون بطاقة نوع المنشور التي تظهر في الصفحة ماقبل الانشاء

const PostTypeSelector = ({ onSelect }: PostTypeSelectorProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3">
      {POST_TYPE_CONFIG.map(({ type, label, icon: Icon }) => (
        <button
          key={type}
          type="button"
          onClick={() => onSelect(type)}
          className="flex flex-col items-center justify-center gap-2 p-2 rounded-2xl border border-[#8A2BE2] hover:bg-[#e5e5f8] hover:border-[#4b1e8a] shadow-lg inset-violet-indigo-500  transition-colors group "
        >
          <div className="w-11 h-11 flex items-center justify-center rounded-full bg-[#e5e5f8] group-hover:bg-white transition-colors">
            <Icon size={22} className="text-[#4b1e8a]" />
          </div>
          <span className="text-sm font-semibold text-motaweer group-hover:text-[#4b1e8a]">
            {label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default PostTypeSelector;
