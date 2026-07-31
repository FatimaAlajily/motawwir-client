import { useState } from "react";
import type { CreateWorkPayload } from "../../types/common/CreatePostPayload";
import { FormTextarea } from "../forms/FormTextarea";

import { SkillsInput } from "../forms/SkillsInput";
import { FormInput } from "../forms/FormInput";
type WorkFormProps = {
  onSubmit: (payload: CreateWorkPayload) => void;
  loading: boolean;
  initialValues?: Omit<CreateWorkPayload, "type">;
  submitLabel?: string;
};

const WorkForm = ({
  onSubmit,
  loading,
  initialValues,
  submitLabel = "نشر فرصة العمل",
}: WorkFormProps) => {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [content, setContent] = useState(initialValues?.content ?? "");
  const [skill, setSkill] = useState<string[]>(initialValues?.skill ?? []);
  const [location, setLocation] = useState(initialValues?.location ?? "");
  const [salaryRange, setSalaryRange] = useState(
    initialValues?.salary_range ?? ""
  );
  const [workPlace, setWorkPlace] = useState(initialValues?.work_place ?? "");
  const [contact, setContact] = useState(initialValues?.contact ?? "");
  const [hours, setHours] = useState(initialValues?.hours ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      type: "work",
      title,
      content,
      skill,
      location,
      salary_range: salaryRange,
      work_place: workPlace,
      contact,
      hours,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormInput
        label="عنوان الوظيفة"
        value={title}
        onChange={setTitle}
        required
      />
      <FormTextarea
        label="تفاصيل الوظيفة"
        value={content}
        onChange={setContent}
        required
      />
      <SkillsInput value={skill} onChange={setSkill} />

      <div className="grid grid-cols-2 gap-4">
        <FormInput
          label="المكان"
          value={location}
          onChange={setLocation}
          required
        />
        <FormInput
          label="نطاق الراتب"
          value={salaryRange}
          onChange={setSalaryRange}
          required
        />
        <FormInput
          label="مكان العمل (عن بعد/ حضور)"
          value={workPlace}
          onChange={setWorkPlace}
          required
        />
        <FormInput
          label="رقم التواصل"
          value={contact}
          onChange={setContact}
          required
        />
      </div>

      <FormInput
        label="ساعات العمل"
        value={hours}
        onChange={setHours}
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

export default WorkForm;
