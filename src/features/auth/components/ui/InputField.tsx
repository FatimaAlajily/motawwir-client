import { Label, TextInput } from "flowbite-react";
import type { Input } from "../../types/state/Input";

export function InputField({ label, type = "text", placeholder, icon }: Input) {
  return (
    <div className="flex flex-col gap-2">
      {label && <Label className="text-gray-900 font-medium">{label}</Label>}

      <TextInput
        type={type}
        placeholder={placeholder}
        rightIcon={icon}
        className=" [&>input]:bg-[#e5e5f8]
                    [&>input]:border-0
                    [&>input]:rounded-2xl
                    [&>input]:text-gray-800
                    [&>input]:focus:ring-purple-500
                    [&>input]:placeholder:text-gray-400"
      />
    </div>
  );
}
