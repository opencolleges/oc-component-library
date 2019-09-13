type TTag = 'div' | 'section';

export interface Props {
  children: React.ReactNode;
  className?: string;
  maxWidth?: boolean;
  modifiers?: string;
  style?: React.CSSProperties;
  tag?: TTag;
}
