import { Label, TextInput } from "flowbite-react";
import type { Input } from "../../types/ui/Input";

export function InputField({
  label,
  type = "text",
  placeholder,
  icon,
  value,
  onChange,
}: Input) {
  return (
    <div className="flex flex-col gap-2">
      {label && <Label className="text-gray-900 font-semibold">{label}</Label>}

      <TextInput
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rightIcon={icon}
        className=" [&>input]:bg-[#e5e5f8]
                    [&>input]:border-0
                    [&>input]:rounded-2xl
                    [&>input]:focus:ring-purple-500
                    [&>input]:placeholder:text-gray-400"
      />
    </div>
  );
}

//[&>input]:text-gray-800     dont forget use it later in classname
