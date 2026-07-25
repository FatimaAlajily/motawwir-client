import type { Role } from "../user/Role";

export type RadioOption = {
  value: Role;
  label: string;
};

export type Radio = {
  label?: string;
  value: Role;
  onChange: (value: Role) => void;
  options: RadioOption[];
};