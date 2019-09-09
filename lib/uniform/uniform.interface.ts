type TTag = 'div' | 'main' | 'section';

export interface Props {
  children: React.ReactNode;
  className?: string;
  mode?: string;
  style?: React.CSSProperties;
  tag?: TTag;
}
