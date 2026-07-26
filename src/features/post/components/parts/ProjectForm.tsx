import { useState } from "react";
import type { CreateProjectPayload } from "../../types/common/CreatePostPayload";
import { FormInput } from "../forms/FormInput";
import { FormTextarea } from "../forms/FormTextarea";
import { SkillsInput } from "../forms/SkillsInput";
import { FileDropInput } from "../forms/FileDropInput";

type ProjectFormProps = {
  onSubmit: (payload: CreateProjectPayload) => void;
  loading: boolean;
};

const ProjectForm = ({ onSubmit, loading }: ProjectFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [skill, setSkill] = useState<string[]>([]);
  const [primaryLink, setPrimaryLink] = useState("");
  const [secondaryLink, setSecondaryLink] = useState("");
  const [file, setFile] = useState<File | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return; // الملف إجباري لهذا النوع (required_unless: question, work, team)

    onSubmit({
      type: "project",
      title,
      content,
      skill,
      primary_link: primaryLink,
      secondary_link: secondaryLink || null,
      file,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormInput
        label="عنوان المشروع"
        value={title}
        onChange={setTitle}
        placeholder="اكتب عنوان مشروعك"
        required
      />

      <FormTextarea
        label="تفاصيل المشروع"
        value={content}
        onChange={setContent}
        placeholder="اشرح فكرة المشروع وأهدافه"
        required
      />

      <SkillsInput
        label="التقنيات / المهارات المستخدمة"
        value={skill}
        onChange={setSkill}
      />

      <FormInput
        label="الرابط الرئيسي (مثل GitHub أو الموقع)"
        value={primaryLink}
        onChange={setPrimaryLink}
        placeholder="https://..."
        type="url"
        required
      />

      <FormInput
        label="رابط إضافي (اختياري)"
        value={secondaryLink}
        onChange={setSecondaryLink}
        placeholder="https://..."
        type="url"
      />

      <FileDropInput
        label="صورة أو ملف توضيحي للمشروع"
        file={file}
        onChange={setFile}
        required
      />

      <button
        type="submit"
        disabled={loading || !file}
        className="bg-[#6620F3] hover:bg-[#6620f3e4] text-white font-semibold py-2.5 rounded-xl disabled:opacity-60"
      >
        {loading ? "جاري النشر..." : "نشر المشروع"}
      </button>
    </form>
  );
};

export default ProjectForm;
