import {
  HelpCircle,
  Briefcase,
  Globe,
  FolderKanban,
  Users,
} from "lucide-react";
import type { ComponentType } from "react";
import type { PostType } from "./PostType";

type PostTypeConfig = {
  type: PostType;
  label: string;
  icon: ComponentType<{ size?: number; className?: string }>;
};

export const POST_TYPE_CONFIG: PostTypeConfig[] = [
  { type: "question", label: "سؤال", icon: HelpCircle },
  { type: "work", label: "فرصة عمل", icon: Briefcase },
  { type: "new", label: "خبر", icon: Globe },
  { type: "project", label: "مشروع", icon: FolderKanban },
  { type: "team", label: "كون فريق", icon: Users },
];
