export interface Props {
  className?: string;
  modifiers?: string;
  name?: string;
  onChange?: () => void;
  options: Array<{ label?: string }>;
  style?: React.CSSProperties;
}

export interface State {
  value?: string;
}
