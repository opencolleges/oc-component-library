export interface Props {
  children: React.ReactNode;
  className?: string;
  expanded?: boolean;
  label: string;
  modifiers?: string;
  style?: React.CSSProperties;
}

export interface State {
  expanded: boolean;
  height?: number;
}
