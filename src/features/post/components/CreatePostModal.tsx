import { useState } from "react";
import { Modal, ModalHeader, ModalBody } from "flowbite-react";
import PostTypeSelector from "./PostTypeSelector";

import useCreatePost from "../hooks/useCreatePost";
import type { PostType } from "../types/PostType";
import type { CreatePostPayload } from "../types/CreatePostPayload";
import QuestionForm from "./QuestionForm";
import NewForm from "./NewForm";
import TeamForm from "./TeamForm";
import WorkForm from "./WorkForm";
import ProjectForm from "./ProjectForm";

type CreatePostModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type Step = "select" | "form";

const CreatePostModal = ({ isOpen, onClose }: CreatePostModalProps) => {
  const [step, setStep] = useState<Step>("select");
  const [selectedType, setSelectedType] = useState<PostType | null>(null);
  const { loading, error, handleCreatePost } = useCreatePost();

  function handleSelectType(type: PostType) {
    setSelectedType(type);
    setStep("form");
  }

  function handleClose() {
    setStep("select");
    setSelectedType(null);
    onClose();
  }

  function handleBack() {
    setStep("select");
    setSelectedType(null);
  }

  async function handleSubmit(payload: CreatePostPayload) {
    const post = await handleCreatePost(payload);
    if (post) {
      handleClose();
    }
  }

  return (
    <Modal show={isOpen} onClose={handleClose} size="lg" dismissible>
      <ModalHeader>
        {step === "select" ? "اختر نوع المنشور" : "إنشاء منشور"}
      </ModalHeader>
      <ModalBody>
        {step === "select" && <PostTypeSelector onSelect={handleSelectType} />}

        {step === "form" && selectedType && (
          <div>
            <button
              type="button"
              onClick={handleBack}
              className="text-sm text-gray-500 hover:text-[#4b1e8a] mb-4"
            >
              ← رجوع لاختيار النوع
            </button>

            {error && (
              <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
            )}

            {selectedType === "question" && (
              <QuestionForm onSubmit={handleSubmit} loading={loading} />
            )}
            {selectedType === "new" && (
              <NewForm onSubmit={handleSubmit} loading={loading} />
            )}
            {selectedType === "work" && (
              <WorkForm onSubmit={handleSubmit} loading={loading} />
            )}
            {selectedType === "team" && (
              <TeamForm onSubmit={handleSubmit} loading={loading} />
            )}
            {selectedType === "project" && (
              <ProjectForm onSubmit={handleSubmit} loading={loading} />
            )}
          </div>
        )}
      </ModalBody>
    </Modal>
  );
};

export default CreatePostModal;
