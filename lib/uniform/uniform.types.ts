type TUniformTag = 'div' | 'main' | 'section';

export default interface IUniformProps {
  children: React.ReactNode;
  className?: string;
  mode?: string;
  style?: React.CSSProperties;
  tag?: TUniformTag;
}
