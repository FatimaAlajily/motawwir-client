import { useState, useRef, useEffect } from "react";
import { MoreVertical, Pencil, Trash2, AlertTriangle } from "lucide-react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "flowbite-react";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
  loading?: boolean;
  asAdmin?: boolean;
};

export function OptionsMenu({
  onEdit,
  onDelete,
  loading = false,
  asAdmin = false,
}: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isMenuOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + 4,
        left: rect.left - 90,
      });
    }
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // تم تصحيح الخطأ هنا بإزالة { true: true } واستخدام الصيغة السليمة أو بدون خيارات
      window.addEventListener("scroll", () => setIsMenuOpen(false), true);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", () => setIsMenuOpen(false));
    };
  }, [isMenuOpen]);

  function handleEdit() {
    setIsMenuOpen(false);
    onEdit();
  }

  function handleDelete() {
    setIsMenuOpen(false);
    setIsDeleteModalOpen(true);
  }

  function confirmDelete() {
    onDelete();
    setIsDeleteModalOpen(false);
  }

  return (
    <>
      <div className="relative inline-block">
        <button
          ref={buttonRef}
          onClick={toggleMenu}
          className="text-gray-400 hover:text-[#6620F3] transition-colors p-1"
        >
          <MoreVertical size={16} />
        </button>

        {isMenuOpen && (
          <div
            ref={menuRef}
            dir="rtl"
            style={{
              top: `${coords.top}px`,
              left: `${coords.left}px`,
            }}
            className="fixed w-32 bg-white border border-gray-100 rounded-xl shadow-2xl z-9999 overflow-hidden"
          >
            {!asAdmin && (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                <Pencil size={13} />
                تعديل
              </button>
            )}

            <button
              onClick={handleDelete}
              className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
            >
              <Trash2 size={13} />
              حذف
            </button>
          </div>
        )}
      </div>

      <Modal
        show={isDeleteModalOpen}
        onClose={() => !loading && setIsDeleteModalOpen(false)}
        size="sm"
      >
        <ModalHeader className="font-bold text-violet-600">
          {asAdmin ? "حذف التعليق (صلاحية المدير)" : "حذف التعليق"}
        </ModalHeader>

        <ModalBody>
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-violet-200 flex items-center justify-center">
              <AlertTriangle size={24} className="text-violet-600" />
            </div>

            <p className="text-sm text-gray-700">
              هل أنت متأكد أنك تريد حذف هذا التعليق؟
            </p>

            <p className="text-xs text-gray-400">
              لا يمكن التراجع عن هذا الإجراء بعد تنفيذه
            </p>
          </div>
        </ModalBody>

        <ModalFooter>
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="text-sm font-semibold text-gray-600 px-4 py-2"
          >
            إلغاء
          </button>

          <button
            onClick={confirmDelete}
            disabled={loading}
            className="text-sm font-bold text-white bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-full"
          >
            {loading ? "جاري الحذف..." : "حذف نهائيًا"}
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
}
