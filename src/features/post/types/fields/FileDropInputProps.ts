export type FileDropInputProps = {
  label: string;
  file: File | null;
  onChange: (file: File | null) => void;
  accept?: string;
  required?: boolean;
};
