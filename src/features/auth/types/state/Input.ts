import type { ComponentProps, FC } from "react";

export type Input = {
  label?: string;
  type?: string;
  placeholder?: string;
  icon?: FC<ComponentProps<"svg">>;
};
