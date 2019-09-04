export default interface IAccordionProps {
  children: React.ReactNode;
  className?: string;
  expanded?: boolean;
  label: string;
  modifiers?: string;
  style?: React.CSSProperties;
}
