import _ from 'lodash';
import React from 'react';

import Icon from '../icon';

import BEM from '../utilities/ts/bem';

import { TIcon } from '../icon/icon';

type TType = `button` | `submit` | `reset`;

interface Props {
  className?: string;
  disabled?: boolean;
  href?: string;
  icon?: TIcon;
  id?: string;
  label: string;
  modifiers?: string;
  name?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  type?: TType;
}

const Button: React.FC<Props> = props => {
  let Tag: keyof JSX.IntrinsicElements = `button`;

  if (!props.disabled && !_.isUndefined(props.href)) {
    Tag = `a`;
  }

  const bem = BEM(`button`);
  bem.addModifiers(props.modifiers);
  bem.addModifiers(props.icon ? `icon` : ``);
  bem.addClassNames(props.className);

  return (
    <Tag
      id={props.id}
      className={bem.getResult()}
      style={props.style}
      type={Tag === `button` ? props.type : null}
      name={props.name}
      href={props.href}
      disabled={props.disabled}
      title={props.label}
      onClick={props.onClick}>
      {props.icon && <Icon type={props.icon} />}
      {props.label}
    </Tag>
  );
};

Button.defaultProps = {
  modifiers: `primary`,
  onClick: () => {
    return;
  },
  type: `button`
};

export default Button;
