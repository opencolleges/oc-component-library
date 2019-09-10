export interface Props {
  checked?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  id?: string;
  modifiers?: string;
  name?: string;
  onChange?: () => void;
  readOnly?: boolean;
  style?: React.CSSProperties;
  value: string;
}

export interface State {
  checked?: boolean;
  disabled?: boolean;
}
