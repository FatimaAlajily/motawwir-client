export type FileFieldProps = {
  label: string;
  onChange: (file: File | null) => void;
  accept?: string;
  currentFileName?: string | null;
};