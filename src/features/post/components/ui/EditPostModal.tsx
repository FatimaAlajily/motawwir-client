import { Modal, ModalHeader, ModalBody } from "flowbite-react";
import useUpdatePost from "../../hooks/useUpdatePost";
import type { Post } from "../../types/common/Post";
import type { UpdatePostPayload } from "../../types/common/CreatePostPayload";
import QuestionForm from "../inputs/QuestionForm";
import WorkForm from "../inputs/WorkForm";
import NewForm from "../inputs/NewForm";
import TeamForm from "../inputs/TeamForm";
import ProjectForm from "../inputs/ProjectForm";

type EditPostModalProps = {
  post: Post | null; // null = مغلق
  onClose: () => void;
  onUpdated: (updatedPost: Post) => void;
};

const EditPostModal = ({ post, onClose, onUpdated }: EditPostModalProps) => {
  const { loading, error, handleUpdatePost } = useUpdatePost();

  if (!post) return null;

  const currentPost = post;

  async function handleSubmit(payload: UpdatePostPayload) {
    const updated = await handleUpdatePost(currentPost.id, payload);
    if (updated) {
      onUpdated(updated);
      onClose();
    }
  }

  function renderForm() {
    switch (currentPost.type) {
      case "question":
        return (
          <QuestionForm
            onSubmit={handleSubmit}
            loading={loading}
            submitLabel="حفظ التعديلات"
            initialValues={{
              title: currentPost.title,
              content: currentPost.content,
            }}
          />
        );
      case "work":
        return (
          <WorkForm
            onSubmit={handleSubmit}
            loading={loading}
            submitLabel="حفظ التعديلات"
            initialValues={{
              title: currentPost.title,
              content: currentPost.content,
              skill: currentPost.skill,
              location: currentPost.work.location ?? "",
              salary_range: currentPost.work.salary_range ?? "",
              work_place: currentPost.work.work_place ?? "",
              contact: currentPost.work.contact ?? "",
              hours: currentPost.work.hours ?? "",
            }}
          />
        );
      case "new":
        return (
          <NewForm
            onSubmit={handleSubmit}
            loading={loading}
            submitLabel="حفظ التعديلات"
            isEditMode={true} // ✅ تم الإضافة هنا
            initialValues={{
              title: currentPost.title,
              primary_link: currentPost.primary_link,
            }}
          />
        );
      case "team":
        return (
          <TeamForm
            onSubmit={handleSubmit}
            loading={loading}
            submitLabel="حفظ التعديلات"
            initialValues={{
              title: currentPost.title,
              content: currentPost.content,
              skill: currentPost.skill,
              primary_link: currentPost.primary_link,
            }}
          />
        );
      case "project":
        return (
          <ProjectForm
            onSubmit={handleSubmit}
            loading={loading}
            submitLabel="حفظ التعديلات"
            isEditMode={true} // ✅ تم الإضافة هنا
            initialValues={{
              title: currentPost.title,
              content: currentPost.content,
              skill: currentPost.skill,
              primary_link: currentPost.primary_link,
              secondary_link: currentPost.secondary_link,
            }}
          />
        );
    }
  }

  return (
    <Modal show={Boolean(post)} onClose={onClose} size="lg" dismissible>
      <ModalHeader>
        <span className="text-[#6902D4] font-bold">تعديل المنشور</span>
      </ModalHeader>
      <ModalBody>
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}
        {renderForm()}
      </ModalBody>
    </Modal>
  );
};

export default EditPostModal;
