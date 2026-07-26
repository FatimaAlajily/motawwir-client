import { useState } from "react";
import type { CreateNewPayload } from "../types/CreatePostPayload";
import { FileDropInput } from "./FileDropInput";
import { FormInput } from "./FormInput";

type NewFormProps = {
  onSubmit: (payload: CreateNewPayload) => void;
  loading: boolean;
};

const NewForm = ({ onSubmit, loading }: NewFormProps) => {
  const [title, setTitle] = useState("");
  const [primaryLink, setPrimaryLink] = useState("");
  const [file, setFile] = useState<File | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    onSubmit({ type: "new", title, primary_link: primaryLink, file });
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
        label="الملف المرفق"
        file={file}
        onChange={setFile}
        required
      />

      <button
        type="submit"
        disabled={loading || !file}
        className="bg-[#6620F3] hover:bg-[#6620f3e4] text-white font-semibold py-2.5 rounded-xl disabled:opacity-60"
      >
        {loading ? "جاري النشر..." : "نشر الخبر"}
      </button>
    </form>
  );
};

export default NewForm;
