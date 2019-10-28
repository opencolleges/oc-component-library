import _ from 'lodash';
import React from 'react';

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
  onChange?: (value: string, name: string, checked: boolean) => void;
  readOnly?: boolean;
  required?: boolean;
  style?: React.CSSProperties;
  value: string;
}

interface State {
  checked: boolean;
}

export default class Checkbox extends React.Component<Props, State> {
  static defaultProps: Partial<Props> = {
    checked: false,
    disabled: false,
    onChange: () => {
      return;
    },
    readOnly: false,
    required: false
  };

  readonly state: Readonly<State> = {
    checked: this.props.checked
  };

  id: string = this.props.id ? this.props.id : _.uniqueId(`${NAMESPACE}-`);

  componentDidUpdate(prevProps): void {
    if (prevProps.checked !== this.props.checked) {
      this.setState({ checked: this.props.checked });
    }
  }

  handleChange = (): void => {
    this.setState({ checked: !this.state.checked }, () => {
      this.props.onChange(
        this.props.value,
        this.props.name,
        this.state.checked
      );
    });
  };

  render() {
    const { props, state, id, handleChange } = this;

    const bem = BEM(`checkbox`);
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
          required={props.required}
          defaultChecked={state.checked}
          tabIndex={!props.readOnly && !props.disabled ? 0 : -1}
          onChange={handleChange}
        />
        <label htmlFor={id} className={bem.getElement(`label`)}>
          {props.children}
        </label>
        {!props.readOnly && !props.disabled && (
          <svg className={bem.getElement(`border-outer`)} viewBox="0 0 16 16">
            <rect
              className={bem.getElement(`border`)}
              x="0.5"
              y="0.5"
              width="15"
              height="15"
              rx="1.5"
            />
          </svg>
        )}
        {!_.includes(_.split(props.modifiers, ` `), `right`) && (
          <React.Fragment>
            <Icon
              type="close"
              visible={_.includes(_.split(props.modifiers, ` `), `error`)}
            />
            <Icon
              type="tick"
              visible={_.includes(_.split(props.modifiers, ` `), `success`)}
            />
          </React.Fragment>
        )}
        <Icon type="tick" visible={state.checked} />
      </div>
    );
  }
}
