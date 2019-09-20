import * as React from 'react';

import { Props } from './radio.interface';

import { NAMESPACE } from '../utilities/ts/constants';

import find from '../utilities/ts/find';
import namespace from '../utilities/ts/namespace';
import toModifier from '../utilities/ts/to-modifier';

import Icon from '../icon';

import * as _ from 'lodash';

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
    const classNames: string = _.trim(
      `${namespace('radio', toModifier(props.modifiers, 'radio'))} ${_.toString(
        props.className
      )}`
    );

    return (
      <div className={classNames} style={props.style}>
        <input
          id={id}
          className={namespace('radio__input')}
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
        <label htmlFor={id} className={namespace('radio__label')}>
          {props.children}
        </label>
        {!props.readOnly && !props.disabled && (
          <svg className={namespace('radio__border-outer')} viewBox="0 0 16 16">
            <circle
              className={namespace('radio__border')}
              cx={8}
              cy={8}
              r={7.5}
            />
          </svg>
        )}
        {!find('right', props.modifiers) && (
          <Icon type="close" visible={find('error', props.modifiers)} />
        )}
        {!find('right', props.modifiers) && (
          <Icon type="tick" visible={find('success', props.modifiers)} />
        )}
      </div>
    );
  }
}
