import { Search } from "lucide-react";
import { useUserSearchStore } from "../../store/useUserSearchStore";

const UserSearchInput = () => {
  const query = useUserSearchStore((state) => state.query);
  const setQuery = useUserSearchStore((state) => state.setQuery);

  return (
    <div
      dir="rtl"
      className="flex items-center gap-2 bg-[#F9F9F6] border border-[#E5E3D8] rounded-md px-3 py-1.5 mb-4 w-[400px] mr-auto ml-0"
      style={{ fontFamily: "'Tajawal', sans-serif" }}
    >
      <Search size={15} className="text-gray-400 shrink-0" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="اكتب اسم المستخدم..."
        className="bg-transparent outline-none text-[12px] w-full placeholder:text-gray-400 text-gray-700"
      />
    </div>
  );
};

export default UserSearchInput;