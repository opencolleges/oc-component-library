type TUniformTag = 'div' | 'main' | 'section';

export interface IUniformProps {
  tag: TUniformTag;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}
