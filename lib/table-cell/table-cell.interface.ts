type TableCellTag = 'td' | 'th';

export interface IProps {
  children?: React.ReactNode;
  className?: string;
  colSpan?: number;
  modifiers?: string;
  rowSpan?: number;
  style?: React.CSSProperties;
  tag?: TableCellTag;
  width?: string;
}
