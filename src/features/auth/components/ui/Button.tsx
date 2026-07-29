import { Button } from "flowbite-react";
import "../../../../styles/theme.css";
import type { But } from "../../types/ui/But";

export function ButtonComponent({ text, loading, type = "submit" }: But) {
  return (
    <Button
      type={type}
      disabled={loading}
      color={"gray"}
      className="font-bold w-full text-white border-0 rounded-full py-2.5 shadow-lg hover:opacity-90 focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800"
      style={{
        backgroundImage: "linear-gradient(135deg, #4b1e8a 0%, #8e52dc 100%)",
      }}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
          <span>جاري التسجيل...</span>
        </div>
      ) : (
        text
      )}
    </Button>
  );
}
