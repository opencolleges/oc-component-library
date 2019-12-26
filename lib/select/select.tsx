import React from 'react';
import Icon from '../icon';
import addNamespace from '../utilities/ts/add-namespace';
import BEM, { BEMInterface } from '../utilities/ts/bem';
import getId from '../utilities/ts/get-id';
import includes from '../utilities/ts/includes';
import itemise from '../utilities/ts/itemise';
import startsWith from '../utilities/ts/starts-with';

interface Options {
  label: string;
  value: any;
}

interface Props {
  className?: string;
  disabled?: boolean;
  id?: string;
  label: string;
  message?: string;
  modifiers?: string;
  name?: string;
  onChange?: (value: string, name: string) => void;
  options?: Options[];
  readOnly?: boolean;
  required?: boolean;
  style?: React.CSSProperties;
  value?: string;
}

interface State {
  active: boolean;
  error: boolean;
  success: boolean;
  value: string;
}

class Select extends React.Component<Props, State> {
  static defaultProps: Partial<Props> = {
    disabled: false,
    onChange: () => {
      return;
    },
    options: [],
    readOnly: false,
    required: false
  };

  id: string = this.props.id ? this.props.id : getId();

  inputRef = React.createRef<HTMLSpanElement>();
  listRef = React.createRef<HTMLUListElement>();

  readonly state: Readonly<State> = {
    active: false,
    error: includes(itemise(this.props.modifiers), `error`),
    success: includes(itemise(this.props.modifiers), `success`),
    value: includes(this.props.options, { value: this.props.value })
      ? this.props.value
      : ``
  };

  componentDidUpdate(prevProps: Props, prevState: State): void {
    if (this.props.modifiers !== prevProps.modifiers) {
      this.setState({
        error: includes(this.props.modifiers, `error`),
        success: includes(this.props.modifiers, `success`)
      });
    }

    if (this.state.value !== prevState.value) {
      this.setState({
        error: false,
        success: false
      });
    }
  }

  handleChange = (): void => {
    this.props.onChange(this.state.value, this.props.name);
  };

  handleKeyDown = (event: React.KeyboardEvent): void => {
    const inputRef: HTMLElement = this.inputRef.current;
    const listRef: HTMLUListElement = this.listRef.current;

    const target: HTMLElement = event.target as HTMLElement;

    // select
    if (target.className === inputRef.className) {
      // 'Space', 'ArrowUp', 'ArrowDown' keys
      if (
        event.keyCode === 32 ||
        event.keyCode === 38 ||
        event.keyCode === 40
      ) {
        event.preventDefault();
        event.stopPropagation();

        this.setState({ active: true });
        this.focusOptionByValue(listRef, this.state.value);
      }

      // options
    } else {
      // 'Tab' key
      if (event.keyCode === 9) {
        event.preventDefault();
        event.stopPropagation();
      }

      // 'Enter' or 'Space' key
      if (event.keyCode === 13 || event.keyCode === 32) {
        event.preventDefault();
        event.stopPropagation();

        this.setState({
          active: false,
          value: target.getAttribute(`data-item`)
        });

        inputRef.focus();
      }

      // 'Esc' key
      if (event.keyCode === 27) {
        event.preventDefault();
        event.stopPropagation();

        this.setState({ active: false });

        inputRef.focus();
      }

      // 'ArrowUp' key
      if (event.keyCode === 38) {
        event.preventDefault();
        event.stopPropagation();
        const previousSibling = target.previousSibling as HTMLElement;
        previousSibling.focus();
      }

      // 'ArrowDown' key
      if (event.keyCode === 40) {
        event.preventDefault();
        event.stopPropagation();
        const nextSibling = target.nextSibling as HTMLElement;
        nextSibling.focus();
      }
    }
  };

  handleMouseDown = (event: React.MouseEvent | React.TouchEvent): void => {
    event.preventDefault();
    event.stopPropagation();

    const inputRef: HTMLElement = this.inputRef.current;
    const listRef: HTMLUListElement = this.listRef.current;

    const target: HTMLElement = event.target as HTMLElement;

    // select
    if (target.className === inputRef.className) {
      if (this.state.active) {
        this.setState({ active: false });
        target.focus();
      } else {
        this.setState({ active: true });
        this.focusOptionByValue(listRef, this.state.value);
      }

      // options
    } else if (target.className === addNamespace(`select__item`)) {
      this.setState(
        {
          active: false,
          value: target.getAttribute(`data-item`)
        },
        () => {
          this.handleChange();
        }
      );

      inputRef.focus();
    }
  };

  handleBlur = (e: React.FocusEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    const target: HTMLElement = e.target as HTMLElement;
    const relatedTarget: HTMLElement =
      (e.relatedTarget as HTMLElement) ||
      (document.activeElement as HTMLElement);

    if (
      (relatedTarget !== null &&
        target.getAttribute(`data-id`) !==
          relatedTarget.getAttribute(`data-id`)) ||
      relatedTarget === null
    ) {
      this.setState({
        active: false
      });
    }
  };

  getLabelFromValue = (value: string): string => {
    const { options }: Props = this.props;

    let label: string = ``;

    for (const option of options) {
      if (option.value === value) {
        label = option.label;
        break;
      }
    }

    return label;
  };

  focusOptionByValue = (options: HTMLUListElement, value: string): void => {
    if (value) {
      for (const child of Array.from(options.childNodes)) {
        const element: HTMLElement = child as HTMLElement;
        if (element.getAttribute(`data-item`) === this.state.value) {
          element.focus();
          break;
        }
      }
    } else {
      const option: HTMLElement = options.firstChild as HTMLElement;
      option.focus();
    }
  };

  render() {
    const {
      props,
      state,
      id,
      inputRef,
      listRef,
      handleChange,
      handleKeyDown,
      handleMouseDown,
      handleBlur,
      getLabelFromValue
    } = this;

    const BEM_MODULE: BEMInterface = BEM(`select`);
    const {
      addClassNames,
      addModifiers,
      getElement,
      getModifier,
      getResult
    }: BEMInterface = BEM_MODULE;

    addModifiers(state.error ? `error` : ``);
    addModifiers(state.success ? `success` : ``);
    addClassNames(state.value ? `selected` : ``);
    addClassNames(state.active ? `active` : ``);
    addClassNames(props.className);

    return (
      <div className={getResult()} style={props.style}>
        <input
          id={id}
          className={`${getElement(`input`)} ${getModifier(`hidden`, `input`)}`}
          type="hidden"
          name={props.name}
          disabled={props.disabled}
          readOnly={props.readOnly}
          required={props.required}
          value={state.value}
          onChange={handleChange}
        />
        <span
          ref={inputRef}
          className={getElement(`input`)}
          tabIndex={!props.readOnly && !props.disabled ? 0 : null}
          onKeyDown={!props.readOnly && !props.disabled ? handleKeyDown : null}
          onMouseDown={
            !props.readOnly && !props.disabled ? handleMouseDown : null
          }
          onTouchEnd={
            !props.readOnly && !props.disabled ? handleMouseDown : null
          }>
          {!state.value
            ? `Pick ${
                startsWith(props.label, [`a`, `e`, `i`, `o`, `u`]) ? `an` : `a`
              } ${props.label.toLowerCase()}`
            : getLabelFromValue(state.value)}
        </span>
        <label className={getElement(`label`)}>{props.label}</label>
        {!props.readOnly && <Icon type="chevron-down" />}
        {!props.readOnly && !props.disabled && (
          <div className={getElement(`border`)} />
        )}
        {!props.readOnly && !props.disabled && (
          <div
            className={getElement(`list-outer`)}
            tabIndex={-1}
            data-id={id}
            onBlur={handleBlur}>
            <ul className={getElement(`list`)} ref={listRef}>
              {props.options.map((option, index) => {
                return (
                  <li
                    key={index}
                    className={getElement(`item`)}
                    tabIndex={-1}
                    data-id={id}
                    data-item={option.value}
                    onKeyDown={handleKeyDown}
                    onMouseDown={handleMouseDown}
                    onTouchEnd={handleMouseDown}
                    onBlur={handleBlur}>
                    {option.label}
                    {state.value === option.value ? (
                      <Icon type="tick" />
                    ) : (
                      <Icon type="tick" visible={false} />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        {!props.readOnly && !props.disabled && !!props.message && (
          <span className={getElement(`message`)}>{props.message}</span>
        )}
      </div>
    );
  }
}

export { Select as default };
