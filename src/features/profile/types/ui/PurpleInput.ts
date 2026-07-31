import type { ReactNode } from "react";

export type PurpleInput = {
  icon?: ReactNode;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  ltr?: boolean;
  className?: string;
};