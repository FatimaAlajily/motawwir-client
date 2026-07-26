import { useState } from "react";
import type { CreateTeamPayload } from "../../types/common/CreatePostPayload";
import { FormInput } from "../forms/FormInput";
import { FormTextarea } from "../forms/FormTextarea";
import { SkillsInput } from "../forms/SkillsInput";

type TeamFormProps = {
  onSubmit: (payload: CreateTeamPayload) => void;
  loading: boolean;
};

const TeamForm = ({ onSubmit, loading }: TeamFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [skill, setSkill] = useState<string[]>([]);
  const [primaryLink, setPrimaryLink] = useState("");

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
        className="bg-[#6620F3] hover:bg-[#6620f3e4] text-white font-semibold py-2.5 rounded-xl disabled:opacity-60"
      >
        {loading ? "جاري النشر..." : "نشر الطلب"}
      </button>
    </form>
  );
};

export default TeamForm;
