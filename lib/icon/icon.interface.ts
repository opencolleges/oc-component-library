export type TIcon =
  | 'arrow-up'
  | 'arrow-right'
  | 'arrow-down'
  | 'arrow-left'
  | 'calendar'
  | 'chevron-up'
  | 'chevron-right'
  | 'chevron-down'
  | 'chevron-left'
  | 'clock'
  | 'close'
  | 'close-ring'
  | 'cloud'
  | 'cloud-download'
  | 'cloud-upload'
  | 'draggable'
  | 'hamburger'
  | 'minus'
  | 'minus-ring'
  | 'question-ring'
  | 'plus'
  | 'plus-ring'
  | 'print'
  | 'search'
  | 'tick'
  | 'tick-ring';

export interface Props {
  modifiers: string;
  className?: string;
  style?: React.CSSProperties;
  size?: string;
}
