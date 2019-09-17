export interface Props {
  checked?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  id?: string;
  modifiers?: string;
  name?: string;
  onChange?: (value: string, name: string) => void;
  readOnly?: boolean;
  required?: boolean;
  style?: React.CSSProperties;
  value: string;
}
