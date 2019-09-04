export type TableCellTag = 'td' | 'th';

export default interface ITableCellProps {
  children?: React.ReactNode;
  className?: string;
  colSpan?: number;
  modifiers?: string;
  rowSpan?: number;
  style?: React.CSSProperties;
  tag?: TableCellTag;
  width?: string;
}
