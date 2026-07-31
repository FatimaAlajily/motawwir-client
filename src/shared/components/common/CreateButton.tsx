import { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";
import CreatePostModal from "../../../features/post/components/models/CreatePostModal";

const CreateButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 px-2.5 py-1.5 text-white bg-[#6620F3] hover:bg-[#6620f3e4] rounded-full font-medium shadow-md transition-all"
      >
        <span className="flex items-center justify-center w-5 h-5 bg-white border border-white rounded-md">
          <Plus className="w-3.5 h-3.5 text-[#6620F3]" />
        </span>

        <span>إنشاء</span>

        <ChevronDown className="w-4 h-4" />
      </button>

      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default CreateButton;
