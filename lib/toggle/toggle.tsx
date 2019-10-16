import React from 'react';

import { Props, State } from './toggle.interface';

import { NAMESPACE } from '../utilities/ts/constants';
import namespace from '../utilities/ts/namespace';
import toModifier from '../utilities/ts/to-modifier';

import _ from 'lodash';

export default class Toggle extends React.Component<Props, State> {
  static defaultProps: Partial<Props> = {
    checked: false,
    disabled: false,
    onChange: () => {
      return;
    },
    readOnly: false
  };

  readonly state: Readonly<State> = {
    checked: this.props.checked
  };

  id: string = this.props.id ? this.props.id : _.uniqueId(`${NAMESPACE}-`);

  handleChange = (): void => {
    this.setState(prevState => ({ checked: !prevState.checked }));
  };

  render() {
    const { props, state, id, handleChange } = this;

    const classNames: string = _.trim(
      `${namespace(
        'toggle',
        toModifier(props.modifiers, 'toggle')
      )} ${_.toString(props.className)}`
    );

    return (
      <div className={classNames} style={props.style}>
        <input
          id={id}
          className={namespace('toggle__input')}
          type="checkbox"
          name={props.name}
          value={props.value}
          disabled={props.disabled}
          readOnly={props.readOnly}
          defaultChecked={state.checked}
          tabIndex={!props.readOnly && !props.disabled ? 0 : -1}
          onChange={handleChange}
        />
        <label htmlFor={id} className={namespace('toggle__label')}>
          {props.children}
        </label>
        {!props.readOnly && !props.disabled && (
          <svg
            className={namespace('toggle__border-outer')}
            viewBox="0 0 40 24">
            <rect
              className={namespace('toggle__border')}
              x="0.5"
              y="0.5"
              width="39"
              height="23"
              rx="11.5"
            />
          </svg>
        )}
      </div>
    );
  }
}
