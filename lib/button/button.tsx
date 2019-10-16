import _ from 'lodash';
import React from 'react';

import Icon from '../icon';

import { Props } from './button.interface';

import { NAMESPACE } from '../utilities/ts/constants';

import BEM from '../utilities/ts/bem';

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
  modifiers: 'button--primary',
  onClick: () => {
    return;
  },
  type: 'button'
};

export default Button;
