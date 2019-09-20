interface Radios {
  className?: string;
  id?: string;
  label: string;
  style?: React.CSSProperties;
  value: string;
}

export interface Props {
  cards?: boolean;
  className?: string;
  disabled?: boolean;
  message?: string;
  modifiers?: string;
  name?: string;
  onChange?: (value: string, name: string) => void;
  radios: Radios[];
  readOnly?: boolean;
  required?: boolean;
  style?: React.CSSProperties;
  value?: string;
}

export interface State {
  error: boolean;
  success: boolean;
  value: string;
}
