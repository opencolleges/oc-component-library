type TLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface Props {
  level?: TLevel;
  modifiers?: string;
  className?: string;
  style?: React.CSSProperties;
  children: string;
}
