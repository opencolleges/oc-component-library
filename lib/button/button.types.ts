import { IIconType } from '../icon/icon.types';

export type ButtonType = 'button' | 'submit' | 'reset';

export default interface IButtonProps {
  id?: string;
  action: string;
  href?: string;
  type?: ButtonType;
  name?: string;
  modifiers?: string;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  icon?: IIconType;
  onClick?: () => void;
}
