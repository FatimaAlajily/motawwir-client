import { useState } from "react";
import type { CreateQuestionPayload } from "../../types/common/CreatePostPayload";
import { FormTextarea } from "../forms/FormTextarea";
import { FormInput } from "../forms/FormInput";

type QuestionFormProps = {
  onSubmit: (payload: CreateQuestionPayload) => void;
  loading: boolean;
  initialValues?: { title: string; content: string };
  submitLabel?: string;
};

const QuestionForm = ({
  onSubmit,
  loading,
  initialValues,
  submitLabel = "نشر السؤال",
}: QuestionFormProps) => {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [content, setContent] = useState(initialValues?.content ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ type: "question", title, content });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 text-text-muted"
    >
      <FormInput
        label="عنوان السؤال"
        value={title}
        onChange={setTitle}
        placeholder="اكتب عنوان سؤالك"
        required
      />
      <FormTextarea
        label="تفاصيل السؤال"
        value={content}
        onChange={setContent}
        placeholder="اشرح سؤالك بالتفصيل"
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

export default QuestionForm;
