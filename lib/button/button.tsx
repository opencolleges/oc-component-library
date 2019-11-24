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

/**
 *
 * @param props
 *
 * The following `props` are available to the `<Button />` component.
 *
 * | Name               | Type(s)              | Arguments                                                                                                                                                                                                                                                                                                                                  |
 * | :----------------- | :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
 * | `props.className?` | `string`             |                                                                                                                                                                                                                                                                                                                                            |
 * | `props.disabled?`  | `boolean`            | `false`, `true`                                                                                                                                                                                                                                                                                                                            |
 * | `props.href?`      | `string`             |                                                                                                                                                                                                                                                                                                                                            |
 * | `props.icon?`      | `string`             | `arrow-down`, `arrow-left`, `arrow-right`, `arrow-up`, `calendar`, `chevron-down`, `chevron-left`, `chevron-right`, `chevron-up`, `clock`, `close`, `close-ring`, `cloud`, `cloud-download`, `cloud-upload`, `draggable`, `hamburger`, `minus`, `minus-ring`, `plus`, `plus-ring`, `print`, `question-ring`, `search`, `tick`, `tick-ring` |
 * | `props.id?`        | `string`             |                                                                                                                                                                                                                                                                                                                                            |
 * | `props.label`      | `string`             |                                                                                                                                                                                                                                                                                                                                            |
 * | `props.modifiers?`  | `string`             |                                                                                                                                                                                                                                                                                                                                            |
 * | `props.name?`      | `string`             |                                                                                                                                                                                                                                                                                                                                            |
 * | `props.onClick?`   | `string`             |                                                                                                                                                                                                                                                                                                                                            |
 * | `props.style?`     | `CSS properties`     |                                                                                                                                                                                                                                                                                                                                            |
 * | `props.type?`      | `string`             | `button`, `submit`, `reset`                                                                                                                                                                                                                                                                                                                |
 *
 * @returns
 *
 * ```
 * <!-- Declaration -->
 * <Button href="https://www.example.com" label="Learn more" />
 *
 * <!-- Output -->
 * <a class="uds-button uds-button--primary" href="https://www.example.com" title="Learn more">Learn more</a>
 *
 * <!-- Declaration -->
 * <Button label="Delete" modifiers="secondary error" type="reset" />
 *
 * <!-- Output -->
 * <button class="uds-button uds-button--secondary uds-button--error" type="reset" title="Delete">Delete</button>
 *
 *  <!-- Declaration -->
 * <Button disabled={true} label="Submit" />
 *
 * <!-- Output -->
 * <button class="uds-button uds-button--primary" disabled title="Submit">Submit</button>
 * ```
 *
 */

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
