import { Search } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import SerchRabbitImage from "../../../assets/images/IconSearch.png";
import { usePostSearchStore } from "../../store/usePostSearchStore";

type SearchBarProps = {
  autoFocus?: boolean;
};

const SearchBar = ({ autoFocus }: SearchBarProps) => {
  const query = usePostSearchStore((state) => state.query);
  const setQuery = usePostSearchStore((state) => state.setQuery);

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (value: string) => {
    setQuery(value);

    // إذا كان المستخدم في صفحة المستخدمين
    // وينشئ بحثًا، انتقل إلى الصفحة الرئيسية
    if (value.trim() && location.pathname === "/dashbord/users") {
      navigate("/dashbord");
    }
  };

  return (
    <div className="flex items-center w-full">
      <div className="relative w-full">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <img
            src={SerchRabbitImage}
            alt="بحث"
            className="w-10 h-10 md:w-18 md:h-18 object-contain"
          />
        </span>

        <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </span>

        <input
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          autoFocus={autoFocus}
          placeholder="ابحث عن منشور ما . . ."
          className="w-full py-2.5 pr-10 pl-3 text-sm text-gray-700 bg-gray-100 rounded-full border focus:ring-2 outline-0 focus:ring-[#dfd2f14a]"
        />
      </div>
    </div>
  );
};

export default SearchBar;