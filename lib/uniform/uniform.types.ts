type TUniformTag = 'div' | 'main' | 'section';

export interface IUniformProps {
  mode?: string;
  tag?: TUniformTag;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}
