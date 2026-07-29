import type { AvatarProps } from "../../types/ui/Avatar";

export function CommentAvatar({ src, alt, size = 36 }: AvatarProps) {
  return (
    <img
      src={src || "/default-avatar.png"}
      alt={alt}
      className="rounded-full object-cover border border-purple-100 shrink-0"
      style={{ width: size, height: size }}
    />
  );
}