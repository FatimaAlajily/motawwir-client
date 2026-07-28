import { Search } from "lucide-react";
import SerchRabbitImage from "../../../assets/images/IconSearch.png";
import { usePostSearchStore } from "../../store/usePostSearchStore";

const SearchBar = () => {
  const query = usePostSearchStore((state) => state.query);
  const setQuery = usePostSearchStore((state) => state.setQuery);
  return (
    <div className="flex items-center">
      <div className="relative w-56 md:w-72 lg:w-96">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <img
            src={SerchRabbitImage}
            alt="بحث"
            className="w-18 h-18 object-contain"
          />
        </span>

        <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </span>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث عن منشور ما . . ."
          className="w-full py-2.5 pr-10 pl-3 text-sm text-gray-700 bg-gray-100 rounded-full border focus:ring-2 outline-0 focus:ring-[#dfd2f14a]"
        />
      </div>
    </div>
  );
};

export default SearchBar;
