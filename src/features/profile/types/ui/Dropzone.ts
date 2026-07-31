import type { ReactNode } from "react";

export type Dropzone = {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  fileName?: string | null;
  fileIcon?: ReactNode;
  accept?: string;
  onChange: (file: File | null) => void;
};