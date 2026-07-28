// import { useState } from "react";
// import type { CreateQuestionPayload } from "../../types/common/CreatePostPayload";
// import { FormTextarea } from "../forms/FormTextarea";
// import { FormInput } from "../forms/FormInput";

// type QuestionFormProps = {
//   onSubmit: (payload: CreateQuestionPayload) => void;
//   loading: boolean;
// };

// const QuestionForm = ({ onSubmit, loading }: QuestionFormProps) => {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     onSubmit({ type: "question", title, content });
//   }

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//       <FormInput
//         label="عنوان السؤال"
//         value={title}
//         onChange={setTitle}
//         placeholder="اكتب عنوان سؤالك"
//         required
//       />
//       <FormTextarea
//         label="تفاصيل السؤال"
//         value={content}
//         onChange={setContent}
//         placeholder="اشرح سؤالك بالتفصيل"
//         required
//       />
//       <button
//         type="submit"
//         disabled={loading}
//         className="bg-[#6620F3] hover:bg-[#6620f3e4] text-white font-semibold py-2.5 rounded-xl disabled:opacity-60"
//       >
//         {loading ? "جاري النشر..." : "نشر السؤال"}
//       </button>
//     </form>
//   );
// };

// export default QuestionForm;
