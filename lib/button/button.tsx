// Lodash
import * as _ from 'lodash';
import * as React from 'react';
// * child imports
import Icon from '../icon';
// Constatant
import { NAMESPACE } from '../utilities/js/constants';
// * Utility className
import namespace from '../utilities/js/namespace';
// Types
import { IProps } from './button.types';

const Button: React.FC<IProps> = props => {
  let Tag: keyof JSX.IntrinsicElements = 'button';
  if (!props.disabled && !_.isUndefined(props.href)) {
    Tag = 'a';
  }

  const classNames: string = _.trim(
    `${namespace(
      'button',
      props.modifiers,
      props.icon ? 'button--icon' : ''
    )} ${_.toString(props.className)}`
  );

  return (
    <Tag
      id={props.id ? props.id : _.uniqueId(`${NAMESPACE}-`)}
      className={classNames}
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
  onClick: () => {
    return true;
  },
  type: 'button'
};

export default Button;
