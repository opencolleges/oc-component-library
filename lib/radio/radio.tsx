import React from 'react';
import Icon from '../icon';
import BEM, { BEMInterface } from '../utilities/ts/bem';
import getId from '../utilities/ts/get-id';
import includes from '../utilities/ts/includes';
import itemise from '../utilities/ts/itemise';

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

class Radio extends React.Component<Props> {
  static defaultProps: Partial<Props> = {
    checked: false,
    disabled: false,
    onChange: () => {
      return;
    },
    readOnly: false,
    required: false
  };

  id: string = this.props.id ? this.props.id : getId();

  handleChange = (): void => {
    this.props.onChange(this.props.value, this.props.name);
  };

  render() {
    const { props, id, handleChange } = this;

    const BEM_MODULE: BEMInterface = BEM(`radio`);
    const {
      addClassNames,
      addModifiers,
      getElement,
      getResult
    }: BEMInterface = BEM_MODULE;

    addModifiers(props.modifiers);
    addClassNames(props.className);

    return (
      <div className={getResult()} style={props.style}>
        <input
          id={id}
          className={getElement(`input`)}
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
        <label htmlFor={id} className={getElement(`label`)}>
          {props.children}
        </label>
        {!props.readOnly && !props.disabled && (
          <svg className={getElement(`border-outer`)} viewBox="0 0 16 16">
            <circle className={getElement(`border`)} cx="8" cy="8" r="7.5" />
          </svg>
        )}
        {!includes(itemise(props.modifiers), `right`) && (
          <React.Fragment>
            <Icon
              type="close"
              visible={includes(itemise(props.modifiers), `error`)}
            />
            <Icon
              type="tick"
              visible={includes(itemise(props.modifiers), `success`)}
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}

export { Radio as default };
