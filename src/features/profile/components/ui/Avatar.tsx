import type { Avatar } from "../../types/ui/Avatar";

const sizeClasses = {
  sm: "w-12 h-12 border-2 ring-2",
  md: "w-20 h-20 border-[3px] ring-3",
  lg: "w-28 h-28 md:w-32 md:h-32 border-4 ring-4",
};

export function AvatarComponent({
  src,
  alt,
  size = "lg",
  className = "",
}: Avatar) {
  return (
    <img
      src={src}
      alt={alt}
      className={`
        rounded-full
        object-cover
        border-[#818CF8]
        ring-purple-50
        shadow-md
        ${sizeClasses[size]}
        ${className}
      `}
    />
  );
}