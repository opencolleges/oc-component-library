type TTag = 'div' | 'main' | 'section';

export interface IProps {
  children: React.ReactNode;
  className?: string;
  mode?: string;
  style?: React.CSSProperties;
  tag?: TTag;
}
