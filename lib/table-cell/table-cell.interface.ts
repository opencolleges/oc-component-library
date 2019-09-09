type TTag = 'td' | 'th';

export interface Props {
  children?: React.ReactNode;
  className?: string;
  colSpan?: number;
  modifiers?: string;
  rowSpan?: number;
  style?: React.CSSProperties;
  tag?: TTag;
  width?: string;
}
