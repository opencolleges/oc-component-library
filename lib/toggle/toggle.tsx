import React from 'react';
import BEM, { BEMInterface } from '../utilities/ts/bem';
import getId from '../utilities/ts/get-id';

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

interface RenderInterface {
  handleChange: () => void;
  id: string;
  props: Props;
  state: State;
}

class Toggle extends React.Component<Props, State> {
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

  id: string = this.props.id ? this.props.id : getId();

  handleChange = (): void => {
    this.setState(prevState => ({ checked: !prevState.checked }));
  };

  render() {
    const { props, state, id, handleChange }: RenderInterface = this;

    const BEM_MODULE: BEMInterface = BEM(`toggle`);
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
          defaultChecked={state.checked}
          tabIndex={!props.readOnly && !props.disabled ? 0 : -1}
          onChange={handleChange}
        />
        <label htmlFor={id} className={getElement(`label`)}>
          {props.children}
        </label>
        {!props.readOnly && !props.disabled && (
          <svg className={getElement(`border-outer`)} viewBox="0 0 40 24">
            <rect
              className={getElement(`border`)}
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

export { Toggle as default };
