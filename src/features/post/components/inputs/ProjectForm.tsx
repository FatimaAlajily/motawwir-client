import { useState } from "react";
import type { CreateProjectPayload } from "../../types/common/CreatePostPayload";
import { FormInput } from "../forms/FormInput";
import { FormTextarea } from "../forms/FormTextarea";
import { SkillsInput } from "../forms/SkillsInput";
import { FileDropInput } from "../forms/FileDropInput";

type ProjectFormProps = {
  onSubmit: (payload: CreateProjectPayload) => void;
  loading: boolean;
  initialValues?: {
    title: string;
    content: string;
    skill: string[];
    primary_link: string;
    secondary_link: string | null;
  };
  submitLabel?: string;
  isEditMode?: boolean;
};

const ProjectForm = ({
  onSubmit,
  loading,
  initialValues,
  submitLabel = "نشر المشروع",
  isEditMode = false,
}: ProjectFormProps) => {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [content, setContent] = useState(initialValues?.content ?? "");
  const [skill, setSkill] = useState<string[]>(initialValues?.skill ?? []);
  const [primaryLink, setPrimaryLink] = useState(
    initialValues?.primary_link ?? ""
  );
  const [secondaryLink, setSecondaryLink] = useState(
    initialValues?.secondary_link ?? ""
  );
  const [file, setFile] = useState<File | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isEditMode && !file) return;

    onSubmit({
      type: "project",
      title,
      content,
      skill,
      primary_link: primaryLink,
      secondary_link: secondaryLink || null,
      file: file ?? undefined,
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
        label="التقنيات , المهارات المستخدمة"
        value={skill}
        onChange={setSkill}
      />

      <FormInput
        label="الرابط الرئيسي (GitHub)"
        value={primaryLink}
        onChange={setPrimaryLink}
        placeholder="https://..."
        type="url"
        required
      />

      <FormInput
        label="رابط إضافي (Domain)"
        value={secondaryLink}
        onChange={setSecondaryLink}
        placeholder="https://..."
        type="url"
      />

      <FileDropInput
        label={
          isEditMode
            ? "صورة أو ملف توضيحي (اتركه فارغًا للإبقاء على الحالي)"
            : "صورة أو ملف توضيحي للمشروع"
        }
        file={file}
        onChange={setFile}
        required={!isEditMode}
      />

      <button
        type="submit"
        disabled={loading || (!isEditMode && !file)}
        className="bg-[#6620F3] hover:bg-[#6620f3e4] text-white font-semibold py-2.5 rounded-xl disabled:opacity-60"
      >
        {loading ? "جاري النشر..." : submitLabel}
      </button>
    </form>
  );
};

export default ProjectForm;
