import * as _ from 'lodash';
import * as React from 'react';

import Icon from '../icon';

import { NAMESPACE } from '../utilities/ts/constants';

import BEM from '../utilities/ts/bem';

interface Props {
  checked?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  id?: string;
  modifiers?: string;
  name?: string;
  onChange?: (value: string, name: string) => void;
  readOnly?: boolean;
  required?: boolean;
  style?: React.CSSProperties;
  value: string;
}

export default class Radio extends React.Component<Props> {
  static defaultProps: Partial<Props> = {
    checked: false,
    disabled: false,
    onChange: () => {
      return;
    },
    readOnly: false,
    required: false
  };

  id: string = this.props.id ? this.props.id : _.uniqueId(`${NAMESPACE}-`);

  handleChange = (): void => {
    this.props.onChange(this.props.value, this.props.name);
  };

  render() {
    const { props, id, handleChange } = this;

    const bem = BEM('radio');
    bem.addModifiers(props.modifiers);
    bem.addClassNames(props.className);

    return (
      <div className={bem.getResult()} style={props.style}>
        <input
          id={id}
          className={bem.getElement('input')}
          type="radio"
          name={props.name}
          value={props.value}
          disabled={props.disabled}
          readOnly={props.readOnly}
          required={props.required}
          defaultChecked={props.checked}
          tabIndex={!props.readOnly && !props.disabled ? 0 : -1}
          onChange={handleChange}
        />
        <label htmlFor={id} className={bem.getElement('label')}>
          {props.children}
        </label>
        {!props.readOnly && !props.disabled && (
          <svg className={bem.getElement('border-outer')} viewBox="0 0 16 16">
            <circle
              className={bem.getElement('border')}
              cx="8"
              cy="8"
              r="7.5"
            />
          </svg>
        )}
        {!_.includes(_.split(props.modifiers, ' '), 'right') && (
          <Icon
            type="close"
            visible={_.includes(_.split(props.modifiers, ' '), 'error')}
          />
        )}
        {!_.includes(_.split(props.modifiers, ' '), 'right') && (
          <Icon
            type="tick"
            visible={_.includes(_.split(props.modifiers, ' '), 'success')}
          />
        )}
      </div>
    );
  }
}
