import { Spinner } from "flowbite-react";
import type { Load } from "../../types/ui/Load";

const LoadingScreen = ({ message = "جاري التحميل...", size = "lg" }: Load) => {
  return (
    <div
      dir="rtl"
      className="min-h-screen flex items-center justify-center bg-gray-100 p-3"
      style={{ fontFamily: '"Tajawal", sans-serif' }}
    >
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center gap-4">
        <Spinner aria-label={message} size={size} className="text-purple-700" />
        <span className="text-gray-700 font-medium text-lg">{message}</span>
      </div>
    </div>
  );
};

export default LoadingScreen;