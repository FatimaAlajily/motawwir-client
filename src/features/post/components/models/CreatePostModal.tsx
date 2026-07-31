import { useState } from "react";
import { Modal, ModalHeader, ModalBody } from "flowbite-react";
import type { PostType } from "../../types/common/PostType";
import useCreatePost from "../../hooks/useCreatePost";
import PostTypeSelector from "./PostTypeSelector";
import PostCreateFormStep from "./CreateFormStep";

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

  async function handleSubmit(payload: Parameters<typeof handleCreatePost>[0]) {
    const post = await handleCreatePost(payload);
    if (post) {
      handleClose();
    }
  }

  return (
    <Modal
      show={isOpen}
      onClose={handleClose}
      size="lg"
      dismissible
      className="[&>div>div]:border [&>div>div]:border-[#6902D4]"
      style={{ fontFamily: "Tajawal" }}
    >
      <ModalHeader className="font-Taj">
        {step === "select" ? (
          <span className="text-[#6902D4] font-bold">اختر نوع المنشور</span>
        ) : (
          <span className="text-[#6902D4] font-bold">إنشاء منشور </span>
        )}
      </ModalHeader>
      <ModalBody>
        {step === "select" && <PostTypeSelector onSelect={handleSelectType} />}

        {step === "form" && selectedType && (
          <PostCreateFormStep
            selectedType={selectedType}
            loading={loading}
            error={error}
            onSubmit={handleSubmit}
            onBack={handleBack}
          />
        )}
      </ModalBody>
    </Modal>
  );
};

export default CreatePostModal;
