import { useState } from "react";
import { MoreVertical, Pencil, Trash2, AlertTriangle } from "lucide-react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "flowbite-react";
import useDeletePost from "../../hooks/useDeletePost";

type PostOptionsMenuProps = {
  postId: number;
  onDeleted: () => void;
  onEdit?: () => void; // اختياري حاليًا لحين بناء ميزة التعديل
};

const PostOptionsMenu = ({
  postId,
  onDeleted,
  onEdit,
}: PostOptionsMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { loading, error, handleDeletePost } = useDeletePost();

  async function handleConfirmDelete() {
    const success = await handleDeletePost(postId);
    if (success) {
      setIsDeleteModalOpen(false);
      onDeleted();
    }
  }

  function handleEditClick() {
    setIsMenuOpen(false);
    onEdit?.();
  }

  function handleDeleteClick() {
    setIsMenuOpen(false);
    setIsDeleteModalOpen(true);
  }

  return (
    <div className="relative">
      {/* -------- Trigger Button (⋮) -------- */}
      <button
        type="button"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="text-gray-400 hover:text-[#6620F3] transition-colors p-0.5"
        aria-label="خيارات المنشور"
      >
        <MoreVertical size={16} />
      </button>

      {/* -------- Backdrop to close menu on outside click -------- */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* -------- Dropdown Menu -------- */}
      {isMenuOpen && (
        <div
          dir="rtl"
          className="absolute left-0 top-full mt-1 w-32 bg-white border border-gray-100 rounded-xl shadow-lg z-20 overflow-hidden"
          style={{ fontFamily: "'Tajawal', sans-serif" }}
        >
          {onEdit && (
            <button
              type="button"
              onClick={handleEditClick}
              className="flex items-center gap-2 w-full px-3 py-2 text-[12px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Pencil size={13} />
              تعديل
            </button>
          )}

          <button
            type="button"
            onClick={handleDeleteClick}
            className="flex items-center gap-2 w-full px-3 py-2 text-[12px] font-semibold text-red-600 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={13} />
            حذف
          </button>
        </div>
      )}

      {/* -------- Delete Confirmation Modal -------- */}
      <Modal
        show={isDeleteModalOpen}
        onClose={() => !loading && setIsDeleteModalOpen(false)}
        size="sm"
        dismissible={!loading}
        style={{ fontFamily: "'Tajawal', sans-serif" }}
      >
        <ModalHeader className="font-bold text-violet-600">
          حذف المنشور
        </ModalHeader>

        <ModalBody>
          <div className="flex flex-col items-center text-center gap-3 py-2">
            <div className="w-12 h-12 rounded-full bg-violet-200 flex items-center justify-center">
              <AlertTriangle size={24} className="text-violet-600" />
            </div>

            <p className="text-sm text-gray-700">
              هل أنت متأكد أنك تريد حذف هذا المنشور؟
            </p>
            <p className="text-xs text-gray-400">
              لا يمكن التراجع عن هذا الإجراء بعد تنفيذه
            </p>

            {error && (
              <p className="text-xs text-red-500 font-semibold">{error}</p>
            )}
          </div>
        </ModalBody>

        <ModalFooter className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(false)}
            disabled={loading}
            className="text-sm font-semibold text-gray-600 hover:text-gray-800 px-4 py-2 rounded-full transition-colors disabled:opacity-50"
          >
            إلغاء
          </button>

          <button
            type="button"
            onClick={handleConfirmDelete}
            disabled={loading}
            className="text-sm font-bold text-white bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-full transition-colors disabled:opacity-60"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                {/* ✅ الـ Spinner بنفس فكرته لكن بلون أبيض ليتناسب مع الزر */}
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                <span>جاري الحذف</span>
              </div>
            ) : (
              "حذف نهائيًا"
            )}

            {/* // {loading ? "جاري الحذف..." : "حذف نهائيًا"} */}
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default PostOptionsMenu;
