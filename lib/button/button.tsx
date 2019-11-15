import React from 'react';
import Icon, { IconTypes } from '../icon';
import BEM, { BEMInterface } from '../utilities/ts/bem';
import isUndefined from '../utilities/ts/is-undefined';

type ButtonTypes = `button` | `submit` | `reset`;

interface Props {
  className?: string;
  disabled?: boolean;
  href?: string;
  icon?: IconTypes;
  id?: string;
  label: string;
  modifiers?: string;
  name?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  type?: ButtonTypes;
}

const Button: React.FC<Props> = (props: Props) => {
  let Tag: keyof JSX.IntrinsicElements = `button`;

  if (!props.disabled && !isUndefined(props.href)) {
    Tag = `a`;
  }

  const BEM_MODULE: BEMInterface = BEM(`button`);
  const { addClassNames, addModifiers, getResult }: BEMInterface = BEM_MODULE;

  addModifiers(props.modifiers);
  addModifiers(!!props.icon ? `icon` : ``);
  addClassNames(props.className);

  return (
    <Tag
      id={props.id}
      className={getResult()}
      style={props.style}
      type={Tag === `button` ? props.type : null}
      name={props.name}
      href={props.href}
      disabled={props.disabled}
      title={props.label}
      onClick={props.onClick}>
      {!!props.icon && <Icon type={props.icon} />}
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

export { Button as default };
