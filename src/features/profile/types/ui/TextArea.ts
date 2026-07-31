export type TextArea = {
  label?: string;
  placeholder?: string;
  value: string;
  rows?: number;
  required?: boolean;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
};