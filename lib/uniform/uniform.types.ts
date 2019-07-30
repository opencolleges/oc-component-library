type TUniformTag = 'div' | 'main' | 'section';

export interface IUniformProps {
  tag: TUniformTag;
  className?: string;
  style?: object;
  children: React.ReactChild;
}
