type TSex = 'female' | 'male' | 'undisclosed';

export interface IAvatarProps {
  modifiers?: string;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  firstName: string;
  sex: TSex;
  image?: string;
  value?: number;
}
