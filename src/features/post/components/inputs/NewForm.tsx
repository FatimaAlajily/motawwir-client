import { useState } from "react";
import type { CreateNewPayload } from "../../types/common/CreatePostPayload";
import { FileDropInput } from "../forms/FileDropInput";
import { FormInput } from "../forms/FormInput";

type NewFormProps = {
  onSubmit: (payload: CreateNewPayload) => void;
  loading: boolean;
  initialValues?: { title: string; primary_link: string };
  submitLabel?: string;
  isEditMode?: boolean;
};

const NewForm = ({
  onSubmit,
  loading,
  initialValues,
  submitLabel = "نشر الخبر",
  isEditMode = false,
}: NewFormProps) => {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [primaryLink, setPrimaryLink] = useState(
    initialValues?.primary_link ?? ""
  );
  const [file, setFile] = useState<File | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isEditMode && !file) return;
    onSubmit({
      type: "new",
      title,
      primary_link: primaryLink,
      file: file ?? undefined,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormInput
        label="عنوان الخبر"
        value={title}
        onChange={setTitle}
        placeholder="اكتب عنوان الخبر"
        required
      />
      <FormInput
        label="رابط المصدر"
        value={primaryLink}
        onChange={setPrimaryLink}
        placeholder="https://..."
        type="url"
        required
      />
      <FileDropInput
        label={
          isEditMode
            ? "الملف المرفق (اتركه فارغًا للإبقاء على الحالي)"
            : "الملف المرفق"
        }
        file={file}
        onChange={setFile}
        required={isEditMode}
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

export default NewForm;
