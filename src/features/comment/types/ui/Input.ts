export type InputProps = {
  onSubmit: (text: string) => Promise<{ status: string } | unknown>;
  loading?: boolean;
  placeholder?: string;
  initialValue?: string;
  onCancel?: () => void;
};