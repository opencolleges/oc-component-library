type tHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export default interface IHeadingProps {
  level?: tHeadingLevel;
  modifiers?: string;
  className?: string;
  style?: React.CSSProperties;
  children: string;
}
