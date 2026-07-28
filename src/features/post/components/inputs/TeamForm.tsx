import { useState } from "react";
import type { CreateTeamPayload } from "../../types/common/CreatePostPayload";
import { FormInput } from "../forms/FormInput";
import { FormTextarea } from "../forms/FormTextarea";
import { SkillsInput } from "../forms/SkillsInput";

type TeamFormProps = {
  onSubmit: (payload: CreateTeamPayload) => void;
  loading: boolean;
  initialValues?: Omit<CreateTeamPayload, "type">;
  submitLabel?: string;
};

const TeamForm = ({
  onSubmit,
  loading,
  initialValues,
  submitLabel = "نشر الطلب",
}: TeamFormProps) => {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [content, setContent] = useState(initialValues?.content ?? "");
  const [skill, setSkill] = useState<string[]>(initialValues?.skill ?? []);
  const [primaryLink, setPrimaryLink] = useState(
    initialValues?.primary_link ?? ""
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      type: "team",
      title,
      content,
      skill,
      primary_link: primaryLink,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormInput
        label="عنوان الفريق"
        value={title}
        onChange={setTitle}
        required
      />
      <FormTextarea
        label="تفاصيل الفريق المطلوب"
        value={content}
        onChange={setContent}
        required
      />
      <SkillsInput
        label="المهارات المطلوبة"
        value={skill}
        onChange={setSkill}
      />
      <FormInput
        label="رابط للتواصل أو التقديم"
        value={primaryLink}
        onChange={setPrimaryLink}
        type="url"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center bg-[#6620F3] hover:bg-[#6620f3e4] text-white font-semibold py-2.5 rounded-xl disabled:opacity-60"
      >
        {loading ? (
          <div className="flex items-center gap-5">
            <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
            <span>جاري النشر...</span>
          </div>
        ) : (
          submitLabel
        )}
      </button>
    </form>
  );
};

export default TeamForm;
