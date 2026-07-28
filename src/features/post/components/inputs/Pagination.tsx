import { ChevronRight, ChevronLeft } from "lucide-react";
import type { PostPagination } from "../../types/forms/PostPagination";

type PaginationProps = {
  meta: PostPagination<unknown>["meta"];
  onPageChange: (page: number) => void;
};

function buildPageNumbers(current: number, last: number): (number | "...")[] {
  const delta = 1;
  const range: (number | "...")[] = [];

  for (let i = 1; i <= last; i++) {
    if (
      i === 1 ||
      i === last ||
      (i >= current - delta && i <= current + delta)
    ) {
      range.push(i);
    } else if (range[range.length - 1] !== "...") {
      range.push("...");
    }
  }

  return range;
}

const Pagination = ({ meta, onPageChange }: PaginationProps) => {
  if (meta.last_page <= 1) return null;

  const pageNumbers = buildPageNumbers(meta.current_page, meta.last_page);

  return (
    <div
      dir="rtl"
      className="flex flex-col sm:flex-row items-center justify-between gap-3 py-3"
    >
      {/* -------- Page Buttons -------- */}
      <div className="flex items-center gap-1">
        {/* زر السهم الأيمن (السابق) */}
        <button
          type="button"
          onClick={() => onPageChange(meta.current_page - 1)}
          disabled={meta.current_page === 1}
          // تم تغيير rounded-full إلى rounded-lg
          className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="الصفحة السابقة"
        >
          <ChevronRight size={16} />
        </button>

        {pageNumbers.map((p, idx) =>
          p === "..." ? (
            <span key={`dots-${idx}`} className="px-1 text-gray-400 text-sm">
              ...
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              // تم تغيير rounded-full إلى rounded-lg
              className={`w-8 h-8 rounded-1xl text-sm font-semibold transition-colors ${
                p === meta.current_page
                  ? "bg-[#6620F3] text-white"
                  : "bg-[#E5E5F8] text-gray-600 hover:bg-gray-300"
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          type="button"
          onClick={() => onPageChange(meta.current_page + 1)}
          disabled={meta.current_page === meta.last_page}
          className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="الصفحة التالية"
        >
          <ChevronLeft size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
