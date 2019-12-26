import React from 'react';
import Icon from '../icon';
import BEM, { BEMInterface } from '../utilities/ts/bem';
import getId from '../utilities/ts/get-id';
import includes from '../utilities/ts/includes';
import itemise from '../utilities/ts/itemise';
import remove from '../utilities/ts/remove';
import truncateString from '../utilities/ts/truncate-string';

interface Props {
  autoComplete?:
    | `additional-name`
    | `address-level1`
    | `address-level2`
    | `address-level3`
    | `address-level4`
    | `address-line1`
    | `address-line2`
    | `address-line3`
    | `bday`
    | `bday-day`
    | `bday-month`
    | `bday-year`
    | `cc-additional-name`
    | `cc-csc`
    | `cc-exp`
    | `cc-exp-month`
    | `cc-exp-year`
    | `cc-family-name`
    | `cc-given-name`
    | `cc-name`
    | `cc-number`
    | `cc-type`
    | `country`
    | `country-name`
    | `current-password`
    | `email`
    | `family-name`
    | `given-name`
    | `honorific-namespace`
    | `honorific-suffix`
    | `impp`
    | `language`
    | `name`
    | `new-password`
    | `nickname`
    | `off`
    | `on`
    | `organization`
    | `organization-title`
    | `photo`
    | `postal-code`
    | `sex`
    | `street-address`
    | `tel`
    | `tel-area-code`
    | `tel-country-code`
    | `tel-extension`
    | `tel-local`
    | `tel-national`
    | `transaction-amount`
    | `transaction-currency`
    | `url`
    | `username`;
  autoFocus?: boolean;
  className?: string;
  disabled?: boolean;
  id?: string;
  label: string;
  maxLength?: number;
  message?: string;
  modifiers?: string;
  name?: string;
  onBlur?: () => void;
  onChange?: (event: React.ChangeEvent, value: string, name: string) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onMouseDown?: () => void;
  onPaste?: () => void;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  spellCheck?: boolean;
  style?: React.CSSProperties;
  type?: `email` | `number` | `password` | `tel` | `text` | `url`;
  value?: string;
}

interface State {
  disabled: boolean;
  error: boolean;
  keyStrokes: boolean;
  success: boolean;
  value: string;
}

class Text extends React.Component<Props, State> {
  static defaultProps: Partial<Props> = {
    disabled: false,
    onBlur: () => {
      return;
    },
    onChange: () => {
      return;
    },
    onFocus: () => {
      return;
    },
    onMouseDown: () => {
      return;
    },
    onPaste: () => {
      return;
    },
    readOnly: false,
    required: false,
    spellCheck: false,
    type: `text`
  };

  static getDerivedStateFromProps(nextProps: Props, nextState: State): object {
    if (nextProps.value !== nextState.value) {
      return {
        value: truncateString(nextProps.value, nextProps.maxLength)
      };
    }
    return null;
  }

  id = this.props.id ? this.props.id : getId();

  readonly state: Readonly<State> = {
    disabled: false,
    error: includes(itemise(this.props.modifiers), `error`),
    keyStrokes: this.props.type === `password` ? false : null,
    success: includes(itemise(this.props.modifiers), `success`),
    value: truncateString(this.props.value, this.props.maxLength)
  };

  shouldComponentUpdate(nextProps: Props): boolean {
    if (this.state.value === nextProps.value) {
      return false;
    }
    return true;
  }

  componentDidUpdate(prevProps: Props, prevState: State): void {
    if (this.props.modifiers !== prevProps.modifiers) {
      this.setState({
        error: includes(itemise(this.props.modifiers), `error`),
        success: includes(itemise(this.props.modifiers), `success`)
      });
    }

    if (this.props.disabled !== prevProps.disabled) {
      this.setState({
        disabled: this.props.disabled
      });
    }
  }

  handleFocus = (event: React.FocusEvent): void => {
    const { onFocus } = this.props;
    const target: HTMLInputElement = event.target as HTMLInputElement;

    // * select the input's value
    target.select();

    // * If the input type is password, then set the keyStrokes state to:
    // * false.
    if (this.props.type === `password`) {
      this.setState({ keyStrokes: false });
    }

    onFocus(event);
  };

  handleKeyDown = (event: React.KeyboardEvent): void => {
    // * event.keycode conflates keys on mobile keypad.
    const key: string = event.key;

    // * If the input type is password, there have been no previous key strokes
    // * since focus and the backspace or delete keys are pressed, then set the
    // * value state to: ''.
    if (
      this.props.type === `password` &&
      !this.state.keyStrokes &&
      (key === `Backspace` || key === `Delete`)
    ) {
      this.setState({ value: `` });
    }

    // * If the input type is number, then prevent any other keys from
    // * leaking into the input's value.
    if (this.props.type === `number`) {
      const validKeys = [
        `Backspace`,
        `Tab`,
        `ArrowLeft`,
        `ArrowUp`,
        `ArrowRight`,
        `ArrowDown`,
        `Delete`,
        `0`,
        `1`,
        `2`,
        `3`,
        `4`,
        `5`,
        `6`,
        `7`,
        `8`,
        `9`,
        // * Mathematical operators
        `-`,
        `+`,
        // * Allows selct all functionality.
        `a`,
        // * Allows copy, paste and cut functionality.
        `c`,
        `v`,
        `x`
      ];

      if (validKeys.indexOf(key) === -1) {
        event.preventDefault();
      }
    }
  };

  handleChange = (event: React.ChangeEvent): void => {
    const target: HTMLInputElement = event.target as HTMLInputElement;

    this.setState({ value: target.value });

    // * If the input type is password, then set the keyStrokes state to: true.
    if (this.props.type === `password`) {
      this.setState({ keyStrokes: true });
    }

    this.props.onChange(event, target.value, this.props.name);
  };

  render() {
    const { props, state, id, handleFocus, handleKeyDown, handleChange } = this;

    const modifiers = remove([`error`, `success`], props.modifiers);

    const BEM_MODULE: BEMInterface = BEM(`text`);
    const {
      addClassNames,
      addModifiers,
      getElement,
      getResult
    }: BEMInterface = BEM_MODULE;

    addModifiers(modifiers);
    addModifiers(state.error ? `error` : ``);
    addModifiers(state.success ? `success` : ``);
    addClassNames(props.className);

    return (
      <div className={getResult()} style={props.style}>
        <input
          id={id}
          className={`${getElement(`input`)}${state.value ? ` active` : ``}`}
          type={props.type}
          name={props.name}
          disabled={props.disabled}
          readOnly={props.readOnly}
          required={props.required}
          autoComplete={props.autoComplete}
          autoFocus={props.autoFocus}
          maxLength={
            props.maxLength && props.maxLength > 0 ? props.maxLength : null
          }
          placeholder={props.type !== `password` ? props.placeholder : null}
          spellCheck={props.spellCheck}
          value={state.value}
          tabIndex={!props.readOnly && !props.disabled ? 0 : -1}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          onBlur={props.onBlur}
          onPaste={props.onPaste}
        />
        <label className={getElement(`label`)}>{props.label}</label>
        {!props.readOnly && !props.disabled && (
          <Icon type="close" visible={state.error ? state.error : false} />
        )}
        {!props.readOnly && !props.disabled && (
          <Icon type="tick" visible={state.success ? state.success : false} />
        )}
        {!props.readOnly && !props.disabled && (
          <div className={getElement(`border`)} />
        )}
        {!props.readOnly && !props.disabled && props.message && (
          <span className={getElement(`message`)}>{props.message}</span>
        )}
      </div>
    );
  }
}

export { Text as default };
