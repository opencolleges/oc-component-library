import BrowserDetect from 'browser-detect';
import _ from 'lodash';
import React from 'react';
import BEM, { BEMInterface } from '../utilities/ts/bem';
import getId from '../utilities/ts/get-id';
import getWindowWidth from '../utilities/ts/get-window-width';
import remove from '../utilities/ts/remove';
import truncateString from '../utilities/ts/truncate-string';

interface Props {
  autoComplete?: string;
  autoFocus?: boolean;
  className?: string;
  disabled?: boolean;
  grammarly?: boolean;
  id?: string;
  label: string;
  maxLength?: number;
  message?: string;
  modifiers?: string;
  name?: string;
  onChange?: (value: string, name: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  spellCheck?: boolean;
  style?: React.CSSProperties;
  value?: string;
}

interface State {
  error: boolean;
  height: number;
  overflow: string;
  remaining: number;
  success: boolean;
  value: string;
}

class Textarea extends React.Component<Props> {
  static defaultProps: Partial<Props> = {
    disabled: false,
    grammarly: true,
    onChange: () => {
      return;
    },
    readOnly: false,
    required: false,
    spellCheck: true
  };

  id: string = this.props.id ? this.props.id : getId();
  textareaRef = React.createRef<HTMLTextAreaElement>();

  readonly state: Readonly<State> = {
    error: _.includes(_.split(this.props.modifiers, ` `), `error`),
    height: null,
    overflow: `hidden`,
    remaining: 0,
    success: _.includes(_.split(this.props.modifiers, ` `), `success`),
    value: truncateString(this.props.value, this.props.maxLength)
  };

  componentDidMount(): void {
    this.setState({
      remaining: this.calculateRemaining()
    });
    window.addEventListener(`resize`, this.resize);
    this.resize();
  }

  componentDidUpdate(prevProps: Props, prevState: State): void {
    if (this.props.modifiers !== prevProps.modifiers) {
      this.setState({
        error: _.includes(_.split(this.props.modifiers, ` `), `error`),
        message: this.props.message ? this.props.message : ``,
        success: _.includes(_.split(this.props.modifiers, ` `), `success`)
      });
    }

    if (this.props.disabled !== prevProps.disabled) {
      this.setState({
        disabled: this.props.disabled
      });
    }

    if (this.state.value !== prevState.value) {
      this.setState({
        error: false,
        message: ``,
        success: false
      });
    }
  }

  componentWillUnmount(): void {
    window.removeEventListener(`resize`, this.resize);
  }

  calculateRemaining = (value: string = this.props.value): number => {
    if (!value) {
      return this.props.maxLength;
    }

    if (value.length < this.props.maxLength) {
      return this.props.maxLength - value.length;
    }

    return 0;
  };

  resize = (): void => {
    const textarea: HTMLTextAreaElement = this.textareaRef.current;

    this.setState(
      {
        height: null
      },
      () => {
        const windowWidth: string = getWindowWidth();

        let maxHeight: number = null;
        let height: number = null;

        if (!this.props.readOnly) {
          if (windowWidth === `small`) {
            maxHeight = 200;
          } else if (windowWidth === `medium`) {
            maxHeight = 264;
          } else {
            maxHeight = 392;
          }
        }

        height = textarea.scrollHeight + 1;

        if (maxHeight && textarea.scrollHeight + 1 >= maxHeight) {
          height = maxHeight;
        }

        this.setState({
          height,
          overflow:
            maxHeight && textarea.scrollHeight + 1 < maxHeight
              ? `hidden`
              : `auto`
        });
      }
    );
  };

  showMessage = (
    message: string,
    maxLength: number,
    remaining: number
  ): string => {
    if (message) {
      return message;
    }

    if (maxLength) {
      if (remaining <= 0) {
        return `You've reached ${maxLength} characters`;
      }
      return `${remaining} characters remaining`;
    }

    return ``;
  };

  handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target: HTMLTextAreaElement = event.target;

    this.setState({
      remaining: this.calculateRemaining(target.value),
      value: target.value
    });

    this.resize();
    this.props.onChange(target.value, this.props.name);
  };

  render() {
    const { props, state, id, textareaRef, handleChange } = this;

    const modifiers = remove([`error`, `success`], props.modifiers);

    const BEM_MODULE: BEMInterface = BEM(`textarea`);
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

    const browser = BrowserDetect();

    const borderHeight = browser.name === `firefox` ? 0 : 1;

    return (
      <div
        className={getResult()}
        style={
          state.height
            ? { height: `${state.height + 40}px`, ...props.style }
            : props.style
        }>
        <textarea
          ref={textareaRef}
          id={id}
          className={
            !state.value ? getElement(`input`) : `${getElement(`input`)} active`
          }
          name={props.name}
          disabled={props.disabled}
          readOnly={props.readOnly}
          required={props.required}
          autoComplete={props.autoComplete}
          autoFocus={props.autoFocus}
          maxLength={
            props.maxLength && props.maxLength > 0 ? props.maxLength : null
          }
          placeholder={props.placeholder}
          spellCheck={props.spellCheck}
          value={state.value}
          rows={1}
          tabIndex={!props.readOnly && !props.disabled ? 0 : -1}
          style={{
            height: state.height ? `${state.height}px` : null,
            overflow: state.overflow === `auto` ? `auto` : null
          }}
          // Grammarly control
          data-gramm={!props.grammarly ? false : null}
          onChange={handleChange}
        />
        <label className={getElement(`label`)}>{props.label}</label>
        {!props.readOnly && !props.disabled && (
          <div
            className={getElement(`border`)}
            style={
              state.height
                ? { top: `${state.height + (16 - borderHeight)}px` }
                : null
            }
          />
        )}
        {!props.readOnly && !props.disabled && (
          <span className={getElement(`message`)}>
            {this.showMessage(props.message, props.maxLength, state.remaining)}
          </span>
        )}
      </div>
    );
  }
}

export { Textarea as default };
