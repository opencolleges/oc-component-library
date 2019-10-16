import _ from 'lodash';
import React from 'react';

import Icon from '../icon';

import { NAMESPACE } from '../utilities/ts/constants';

import BEM from '../utilities/ts/bem';

import { TIcon } from '../icon/icon';
type TType = 'button' | 'submit' | 'reset';

interface Props {
  id?: string;
  action: string;
  href?: string;
  type?: TType;
  name?: string;
  modifiers?: string;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  icon?: TIcon;
  onClick?: () => void;
}

const Button: React.FC<Props> = props => {
  let Tag: keyof JSX.IntrinsicElements = 'button';

  if (!props.disabled && !_.isUndefined(props.href)) {
    Tag = 'a';
  }

  const bem = BEM('button');
  bem.addModifiers(props.modifiers);
  bem.addModifiers(props.icon ? 'icon' : '');
  bem.addClassNames(props.className);

  return (
    <Tag
      id={props.id ? props.id : _.uniqueId(`${NAMESPACE}-`)}
      className={bem.getResult()}
      style={props.style}
      type={Tag === 'button' ? props.type : null}
      name={props.name}
      href={props.href}
      disabled={props.disabled}
      title={props.action}
      onClick={props.onClick}>
      {props.icon && <Icon type={props.icon} />}
      {props.action}
    </Tag>
  );
};

Button.defaultProps = {
  modifiers: 'primary',
  onClick: () => {
    return;
  },
  type: 'button'
};

export default Button;
