export interface Props {
  children: React.ReactNode;
  className?: string;
  expanded?: boolean;
  label: string;
  modifiers?: string;
  style?: React.CSSProperties;
}

export interface IState {
  expanded: boolean;
  height?: number;
}
