import type { InfoRow } from "../../types/ui/InfoRow";

export function InfoRow({ icon, text, href, truncate = false }: InfoRow) {
  const content = (
    <>
      <span className="text-gray-400 group-hover:text-[#6C5CE7] transition-colors shrink-0">
        {icon}
      </span>
      <span className={truncate ? "truncate" : ""}>{text}</span>
    </>
  );

  const baseClasses = "flex items-center gap-2.5 text-gray-600 hover:text-gray-900 transition-colors text-xs group";

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} ${truncate ? "truncate" : ""}`}
      >
        {content}
      </a>
    );
  }

  return (
    <div className={baseClasses}>
      {content}
    </div>
  );
}