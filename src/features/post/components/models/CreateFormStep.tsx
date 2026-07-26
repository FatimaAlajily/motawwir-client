import type { CreatePostPayload } from "../../types/common/CreatePostPayload";
import type { PostType } from "../../types/common/PostType";
import NewForm from "../inputs/NewForm";
import ProjectForm from "../inputs/ProjectForm";
import QuestionForm from "../inputs/QuestionForm";
import TeamForm from "../inputs/TeamForm";
import WorkForm from "../inputs/WorkForm";
import { Forward } from "lucide-react";

type PostCreateFormStepProps = {
  selectedType: PostType;
  loading: boolean;
  error: string;
  onSubmit: (payload: CreatePostPayload) => void;
  onBack: () => void;
};

const PostCreateFormStep = ({
  selectedType,
  loading,
  error,
  onSubmit,
  onBack,
}: PostCreateFormStepProps) => {
  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="text-sm text-text-muted font-medium hover:text-[#4b1e8a] mb-4"
      >
        <Forward />
        الرجوع لقائمة الأختيار
      </button>

      {error && (
        <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
      )}

      {selectedType === "question" && (
        <QuestionForm onSubmit={onSubmit} loading={loading} />
      )}
      {selectedType === "new" && (
        <NewForm onSubmit={onSubmit} loading={loading} />
      )}
      {selectedType === "work" && (
        <WorkForm onSubmit={onSubmit} loading={loading} />
      )}
      {selectedType === "team" && (
        <TeamForm onSubmit={onSubmit} loading={loading} />
      )}
      {selectedType === "project" && (
        <ProjectForm onSubmit={onSubmit} loading={loading} />
      )}
    </div>
  );
};

export default PostCreateFormStep;
