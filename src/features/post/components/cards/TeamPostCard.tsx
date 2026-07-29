import { useState, type ReactNode } from "react";
import { Bookmark, ArrowLeft, ChevronDown } from "lucide-react";
import type { TeamPost } from "../../types/kinds/TeamPost";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";

type TeamPostCardProps = {
  post: TeamPost;
  deleteAction?: ReactNode;
  isOwner?: boolean;
};

const VISIBLE_SKILLS_COUNT = 3;

const TeamPostCard = ({ post, deleteAction , isOwner }: TeamPostCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [votes, setVotes] = useState(post.votes);


  const visibleSkills = isExpanded
    ? post.skill
    : post.skill.slice(0, VISIBLE_SKILLS_COUNT);

  const remainingCount = Math.max(post.skill.length - VISIBLE_SKILLS_COUNT, 0);

  return (
    <div
      dir="rtl"
      // 3. إضافة h-full و flex flex-col لتوحيد أطوال البطاقات
      className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow w-full overflow-hidden h-full flex flex-col"
      style={{ fontFamily: "'Tajawal', sans-serif" }}
    >
      {/* -------- Title -------- */}
      <div className="flex items-start justify-between mb-1.5">
        <h3 className="text-[13px] font-bold text-motaweer">{post.title}</h3>

        <button
          type="button"
          className="text-gray-400 hover:text-[#6620F3] transition-colors p-0.5 shrink-0"
        >
          <Bookmark size={15} />
        </button>
      </div>

      {/* -------- User Header -------- */}
      <PostHeader
        avatar={post.user.avatar}
        userName={post.user.user_name}
        createdAt={post.created_at}
        showBookmark={false}
        extraAction={deleteAction}
      />

      {/* 4. حاوية flex-1 لدمج المساحة الفارغة */}
      <div className="flex-1 flex flex-col">
        {/* -------- Content -------- */}
        <div className="mb-2.5">
          <p
            className={`text-[11px] text-gray-700 leading-snug whitespace-pre-line wrap-break-word ${
              isExpanded ? "" : "line-clamp-2" // تم تغييرها لسطرين لتناسب حجم البطاقة
            }`}
          >
            {post.content}
          </p>
          {/* زر التوسيع الموحد (يظهر إذا كان النص طويلاً أو هناك مهارات مخفية) */}
          {(post.content.length > 60 || remainingCount > 0) && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-[10px] font-bold text-[#6620F3] hover:underline mt-1"
            >
              {isExpanded ? "عرض أقل" : "عرض المزيد"}
              <ChevronDown
                size={12}
                className={`transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </div>

        {/* -------- Skills -------- */}
        {post.skill && post.skill.length > 0 && (
          <div className="flex flex-wrap items-center gap-1 mb-2.5">
            {visibleSkills.map((skill) => (
              <span
                key={skill}
                // توحيد شكل المهارات مع بطاقة المشروع
                className="text-[10px] font-semibold text-[#4b1e8a] bg-[#F4F0FF] px-2 py-0.5 rounded-full border-0"
              >
                {skill}
              </span>
            ))}
            {/* إظهار عدد المهارات المخفية بدلاً من زر داخل القائمة */}
            {!isExpanded && remainingCount > 0 && (
              <span className="text-[10px] font-bold text-[#6620F3]">
                +{remainingCount}
              </span>
            )}
          </div>
        )}

        {/* -------- Join Button -------- */}
        {/* mt-auto يجعل الزر يلتصق بالأسفل دائماً */}
        <div className="mt-auto mb-2.5">
          {post.primary_link && (
            <a
              href={post.primary_link}
              target="_blank"
              rel="noopener noreferrer" // تم تصحيح هذه القيمة أمنياً
              className="flex items-center justify-center gap-1.5 w-52 mx-auto bg-[#6620F3] hover:bg-[#5a1cd8] text-white font-bold text-xs py-1.5 rounded-full transition-colors"
            >
              الانضمام
              <ArrowLeft size={15} />
            </a>
          )}
        </div>
      </div>

      <hr className="border-gray-100 mb-1.5" />

      {/* -------- Footer -------- */}
      <PostFooter
      postId={post.id}
        upvotes={votes.upvotes}
        downvotes={votes.downvotes}
        ai={votes.ai}
        commentsLabel="الأجوبة"
        onVoteSuccess={setVotes}
        isOwner={isOwner}
      />
    </div>
  );
};

export default TeamPostCard;
