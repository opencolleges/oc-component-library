export interface Props {
  className?: string;
  message?: string;
  modifiers?: string;
  progress: number;
  style?: React.CSSProperties;
  totalProgress?: number;
}

export interface State {
  error: boolean;
  success: boolean;
}
