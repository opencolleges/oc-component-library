import * as React from 'react';
// Constatant
import { NAMESPACE } from '../utilities/js/constants';
// * child imports
import Icon from '../icon';
// Types
import { IProps } from './button.types';
// Lodash
import * as _ from 'lodash';
// * Utility className
import classNames from '../utilities/js/namespace';

const Button: React.FC<IProps> = props => {
  let Tag: keyof JSX.IntrinsicElements = 'button';
  if (!props.disabled && !_.isUndefined(props.href)) {
    Tag = 'a';
  }

  const class_names: string = `${classNames(
    'button',
    props.modifiers,
    props.icon ? 'button--icon' : ''
  )} ${props.className}`;

  return (
    <Tag
      id={props.id ? props.id : _.uniqueId(`${NAMESPACE}-`)}
      className={class_names}
      style={props.style}
      type={Tag === 'button' ? props.type : null}
      name={props.name}
      href={props.href}
      disabled={props.disabled}
      title={props.action}
      onClick={props.onClick}>
      {props.icon && <Icon modifiers={`icon--${props.icon} active`} />}
      {props.action}
    </Tag>
  );
};

Button.defaultProps = {
  type: 'button',
  onClick: () => {}
};

export default Button;
