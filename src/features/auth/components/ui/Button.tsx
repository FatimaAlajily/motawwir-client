import { Button } from "flowbite-react";
import "../../../../styles/theme.css";

export function ButtonComponent() {
  return (
    <Button
      className="w-full text-white border-0 rounded-full py-2.5 font-medium shadow-lg hover:opacity-90 focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800"
      style={{
        backgroundImage: "linear-gradient(135deg, #4b1e8a 0%, #8e52dc 100%)",
      }}
    ></Button>
  );
}
