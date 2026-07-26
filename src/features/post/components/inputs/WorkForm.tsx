import { useState } from "react";
import type { CreateWorkPayload } from "../../types/common/CreatePostPayload";
import { FormTextarea } from "../forms/FormTextarea";

import { SkillsInput } from "../forms/SkillsInput";
import { FormInput } from "../forms/FormInput";
type WorkFormProps = {
  onSubmit: (payload: CreateWorkPayload) => void;
  loading: boolean;
};

const WorkForm = ({ onSubmit, loading }: WorkFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [skill, setSkill] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [workPlace, setWorkPlace] = useState("");
  const [contact, setContact] = useState("");
  const [hours, setHours] = useState("");

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
        className="bg-[#6620F3] hover:bg-[#6620f3e4] text-white font-semibold py-2.5 rounded-xl disabled:opacity-60"
      >
        {loading ? "جاري النشر..." : "نشر فرصة العمل"}
      </button>
    </form>
  );
};

export default WorkForm;
