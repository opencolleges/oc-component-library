import { IIcon } from '../icon/icon.interface';

type TType = 'button' | 'submit' | 'reset';

export interface IProps {
  id?: string;
  action: string;
  href?: string;
  type?: TType;
  name?: string;
  modifiers?: string;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  icon?: IIcon;
  onClick?: () => void;
}
