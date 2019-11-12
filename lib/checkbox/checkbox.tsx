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
  onChange?: (value: string, name: string, checked: boolean) => void;
  readOnly?: boolean;
  required?: boolean;
  style?: React.CSSProperties;
  value: string;
}

interface State {
  checked: boolean;
}

interface RenderInterface {
  handleChange: () => void;
  id: string;
  props: Props;
  state: State;
}

class Checkbox extends React.Component<Props, State> {
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

  id: string = !!this.props.id ? this.props.id : getId();

  componentDidUpdate(prevProps: Props): void {
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
    const { props, state, id, handleChange }: RenderInterface = this;

    const BEM_MODULE: BEMInterface = BEM(`checkbox`);
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
        <label htmlFor={id} className={getElement(`label`)}>
          {props.children}
        </label>
        {!props.readOnly && !props.disabled && (
          <svg className={getElement(`border-outer`)} viewBox="0 0 16 16">
            <rect
              className={getElement(`border`)}
              rx="1.5"
              x="0.5"
              y="0.5"
              width="15"
              height="15"
            />
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
        <Icon type="tick" visible={state.checked} />
      </div>
    );
  }
}

export { Checkbox as default };
