type TUniformTag = 'div' | 'main' | 'section';

export default interface IUniformProps {
  mode?: string;
  tag?: TUniformTag;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}
