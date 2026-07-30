import type { UserType } from "../../types/common/UserType";

type FilterValue = UserType | "all";

type UserTypeFilterProps = {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
};

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: "all", label: "All" },
  { value: "developer", label: "Developer" },
  { value: "company", label: "Company" },
  { value: "client", label: "Client" },
];

const UserTypeFilter = ({ value, onChange }: UserTypeFilterProps) => {
  return (
    <div
      className="flex items-center gap-2 flex-wrap mb-4"
      style={{ fontFamily: "'Tajawal', sans-serif" }}
    >
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          type="button"
          onClick={() => onChange(filter.value)}
          className={`text-[12px] font-medium px-3 py-1 rounded-md transition-all shadow-sm ${
            value === filter.value
              ? "bg-[#6c5ce7] text-white"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default UserTypeFilter;