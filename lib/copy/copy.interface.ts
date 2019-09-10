type TTag =
  | 'a'
  | 'abbr'
  | 'blockquote'
  | 'code'
  | 'em'
  | 'kbd'
  | 'li'
  | 'mark'
  | 'ol'
  | 'p'
  | 'pre'
  | 'small'
  | 'span'
  | 'strong'
  | 'sub'
  | 'sup'
  | 'ul';

export interface Props {
  children: React.ReactNode;
  className?: string;
  href?: string;
  modifiers?: string;
  style?: React.CSSProperties;
  tag?: TTag;
  target?: string;
  title?: string;
}
