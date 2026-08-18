import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  MoreVertical,
  Ban,
  ShieldCheck,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "flowbite-react";
import { banUserRequest, unbanUserRequest } from "../../api/UserApi";

type UserOptionsMenuProps = {
  userId: number;
  isBanned: boolean;
  currentBanReason?: string | null;
  onStatusChange: (
    userId: number,
    isBanned: boolean,
    banReason?: string | null
  ) => void;
};

const UserOptionsMenu = ({
  userId,
  isBanned,
  currentBanReason,
  onStatusChange,
}: UserOptionsMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [banReasonInput, setBanReasonInput] = useState("");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isMenuOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPos({
        top: rect.top + window.scrollY, // فوق الزر
        left: rect.right + window.scrollX, // محاذاة يمين الزر
      });
    }
  }, [isMenuOpen]);

  function handleActionClick() {
    setIsMenuOpen(false);
    setIsModalOpen(true);
  }

  async function handleConfirmAction() {
    setLoading(true);
    setError("");

    try {
      if (isBanned) {
        const response = await unbanUserRequest(userId);
        if (response.status === "success") {
          onStatusChange(userId, false, null);
          setIsModalOpen(false);
        } else {
          setError(response.message);
        }
      } else {
        const response = await banUserRequest(userId, banReasonInput);
        if (response.status === "success") {
          onStatusChange(userId, true, banReasonInput || null);
          setIsModalOpen(false);
          setBanReasonInput("");
        } else {
          setError(response.message);
        }
      }
    } catch {
      setError("حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="text-gray-400 hover:text-[#6620F3] transition-colors p-1 rounded-full hover:bg-gray-100"
        aria-label="خيارات المستخدم"
      >
        <MoreVertical size={18} />
      </button>

      {isMenuOpen &&
        createPortal(
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsMenuOpen(false)}
            />
            <div
              dir="rtl"
              className="fixed w-48 bg-white border border-gray-100 rounded-xl shadow-lg z-50 overflow-hidden"
              style={{
                fontFamily: "'Tajawal', sans-serif",
                top: menuPos.top,
                left: menuPos.left,
                transform: "translate(-100%, -100%)", // يفتح للأعلى ولليسار من نقطة الزر
              }}
            >
              {isBanned && (
                <div className="px-3 py-2 border-b border-gray-100 bg-red-50">
                  <p className="text-[10px] font-bold text-red-500 mb-0.5">
                    سبب الحظر
                  </p>
                  <p className="text-[11px] text-gray-600 leading-snug">
                    {currentBanReason || "لم يُذكر سبب"}
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={handleActionClick}
                className={`flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold transition-colors ${
                  isBanned
                    ? "text-green-600 hover:bg-green-50"
                    : "text-red-600 hover:bg-red-50"
                }`}
              >
                {isBanned ? <ShieldCheck size={14} /> : <Ban size={14} />}
                {isBanned ? "إلغاء الحظر" : "حظر المستخدم"}
              </button>
            </div>
          </>,
          document.body
        )}

      <Modal
        show={isModalOpen}
        onClose={() => !loading && setIsModalOpen(false)}
        size="sm"
        dismissible={!loading}
        style={{ fontFamily: "'Tajawal', sans-serif" }}
      >
        <ModalHeader className="font-bold text-violet-600">
          {isBanned ? "إلغاء حظر المستخدم" : "حظر المستخدم"}
        </ModalHeader>

        <ModalBody>
          <div className="flex flex-col items-center text-center gap-3 py-2">
            <div className="w-12 h-12 rounded-full bg-violet-200 flex items-center justify-center">
              <AlertTriangle size={24} className="text-violet-600" />
            </div>

            <p className="text-sm text-gray-700">
              هل أنت متأكد أنك تريد {isBanned ? "إلغاء حظر" : "حظر"} هذا
              المستخدم؟
            </p>

            {!isBanned && (
              <textarea
                value={banReasonInput}
                onChange={(e) => setBanReasonInput(e.target.value)}
                placeholder="سبب الحظر (اختياري)"
                className="w-full mt-2 px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-violet-100 resize-none"
                rows={3}
                disabled={loading}
              />
            )}

            {error && (
              <p className="text-xs text-red-500 font-semibold">{error}</p>
            )}
          </div>
        </ModalBody>

        <ModalFooter className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            disabled={loading}
            className="text-sm font-semibold text-gray-600 hover:text-gray-800 px-4 py-2 rounded-full transition-colors disabled:opacity-50"
          >
            إلغاء
          </button>
          <button
            type="button"
            onClick={handleConfirmAction}
            disabled={loading}
            className={`text-sm font-bold text-white px-4 py-2 rounded-full transition-colors flex items-center gap-2 min-w-27.5 justify-center ${
              isBanned
                ? "bg-green-600 hover:bg-green-700"
                : "bg-violet-600 hover:bg-violet-700"
            } disabled:opacity-60`}
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : isBanned ? (
              "تأكيد إلغاء الحظر"
            ) : (
              "تأكيد الحظر"
            )}
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UserOptionsMenu;
