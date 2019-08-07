import { IIconType } from '../icon/icon.types';

export type IButtonType = 'button' | 'submit' | 'reset';

export default interface IButtonProps {
  id?: string;
  action: string;
  href?: string;
  type?: IButtonType;
  name?: string;
  modifiers?: string;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  icon?: IIconType;
  onClick?: () => void;
}
