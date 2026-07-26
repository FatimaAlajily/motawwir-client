import { useState } from "react";
import { MoreVertical } from "lucide-react";
import type { WorkPost } from "../../types/kinds/WorkPost";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";

type WorkPostCardProps = {
  post: WorkPost;
};

const VISIBLE_SKILLS_COUNT = 3;

const WorkPostCard = ({ post }: WorkPostCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleSkills = isExpanded
    ? post.skill
    : post.skill.slice(0, VISIBLE_SKILLS_COUNT);

  const remainingCount = post.skill.length - VISIBLE_SKILLS_COUNT;

  return (
    <div
      dir="rtl"
      className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow w-full overflow-hidden"
      style={{ fontFamily: "Tajawal" }}
    >
      {/* -------- Header -------- */}
      <PostHeader
        avatar={post.user.avatar}
        userName={post.user.user_name}
        createdAt={post.created_at}
        extraAction={
          <button
            type="button"
            className="text-gray-400 hover:text-[#6620F3] transition-colors p-1"
          >
            <MoreVertical size={18} />
          </button>
        }
      />

      {/* -------- Title -------- */}
      <h3 className="text-base font-bold text-motaweer mb-4">{post.title}</h3>

      {/* -------- Details Grid + See more -------- */}
      <div className="flex items-start justify-between gap-4">
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 flex-1 min-w-0">
          {/* العمود الأول */}
          <div className="space-y-4 min-w-0">
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-1">الموقع</h4>
              <p className="text-sm text-gray-600 wrap-break-word">
                {post.work.location ?? "—"}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-1">التواصل</h4>
              <p className="text-sm text-gray-600 wrap-break-word">
                {post.work.contact ?? "—"}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-1">المهارات</h4>
              <div className="flex flex-wrap items-center gap-2">
                {visibleSkills.map((skill) => (
                  <span
                    key={skill}
                    className="border border-[#8A2BE2] text-[#4b1e8a] bg-white text-xs font-semibold px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}

                {!isExpanded && remainingCount > 0 && (
                  <span className="text-xs font-bold text-[#6620F3]">
                    +{remainingCount} أخرى
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* العمود الثاني */}
          <div className="space-y-4 min-w-0">
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-1">
                سياسة العمل عن بعد
              </h4>
              <p className="text-sm text-gray-600 wrap-break-word">
                {post.work.work_place ?? "—"}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-1">
                نطاق الراتب
              </h4>
              <p className="text-sm text-gray-600 wrap-break-word">
                {post.work.salary_range ?? "—"}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-1">
                ساعات العمل
              </h4>
              <p className="text-sm text-gray-600 wrap-break-word">
                {post.work.hours ?? "—"}
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="shrink-0 text-xs font-semibold text-[#6620F3] border border-[#6620F3] rounded-full px-3 py-1 min-w-[90px] text-center hover:bg-[#e5e5f8] transition-colors"
        >
          {isExpanded ? "رؤية أقل" : "رؤية المزيد"}
        </button>
      </div>

      {/* -------- About the Job (يظهر فقط عند التوسع، بتحريك سلس عبر grid-rows -------- */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          isExpanded ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden min-w-0">
          <hr className="border-gray-100 mb-3" />
          <h4 className="text-sm font-bold text-gray-900 mb-2">
            تفاصيل الوظيفة
          </h4>
          <p className="text-sm text-gray-600 whitespace-pre-line wrap-break-word">
            {post.content}
          </p>
        </div>
      </div>

      <hr className="border-gray-100 my-3" />

      {/* -------- Footer -------- */}
      <PostFooter
        upvotes={post.votes.upvotes}
        downvotes={post.votes.downvotes}
        ai={post.votes.ai}
      />
    </div>
  );
};

export default WorkPostCard;
