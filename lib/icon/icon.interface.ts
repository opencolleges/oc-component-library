export type TIcon =
  | 'arrow-down'
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-up'
  | 'calendar'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-up'
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
  | 'plus'
  | 'plus-ring'
  | 'print'
  | 'question-ring'
  | 'search'
  | 'tick'
  | 'tick-ring';

export interface Props {
  className?: string;
  style?: React.CSSProperties;
  size?: string;
  type: TIcon;
  visible?: boolean;
}
