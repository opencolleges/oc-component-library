import _ from 'lodash';
import React from 'react';

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
  onChange?: () => void;
  readOnly?: boolean;
  style?: React.CSSProperties;
  value: string;
}

interface State {
  checked?: boolean;
}

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

    const bem = BEM(`toggle`);
    bem.addModifiers(props.modifiers);
    bem.addClassNames(props.className);

    return (
      <div className={bem.getResult()} style={props.style}>
        <input
          id={id}
          className={bem.getElement(`input`)}
          type="checkbox"
          name={props.name}
          value={props.value}
          disabled={props.disabled}
          readOnly={props.readOnly}
          defaultChecked={state.checked}
          tabIndex={!props.readOnly && !props.disabled ? 0 : -1}
          onChange={handleChange}
        />
        <label htmlFor={id} className={bem.getElement(`label`)}>
          {props.children}
        </label>
        {!props.readOnly && !props.disabled && (
          <svg className={bem.getElement(`border-outer`)} viewBox="0 0 40 24">
            <rect
              className={bem.getElement(`border`)}
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
