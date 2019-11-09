import _ from 'lodash';
import React from 'react';

import { NAMESPACE } from '../utilities/ts/constants';

import BEM from '../utilities/ts/bem';
import namespace from '../utilities/ts/namespace';

import Icon from '../icon';

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

class Select extends React.Component<Props> {
  static defaultProps: Partial<Props> = {
    disabled: false,
    onChange: () => {
      return;
    },
    options: [],
    readOnly: false,
    required: false
  };

  id: string = this.props.id ? this.props.id : _.uniqueId(`${NAMESPACE}-`);

  selectRef = React.createRef<HTMLElement>();
  optionsRef = React.createRef<HTMLUListElement>();

  readonly state: Readonly<State> = {
    active: false,
    error: _.includes(_.split(this.props.modifiers, ` `), `error`),
    success: _.includes(_.split(this.props.modifiers, ` `), `success`),
    value: _.find(this.props.options, { value: this.props.value })
      ? this.props.value
      : ``
  };

  componentDidUpdate(prevProps: Props, prevState: State): void {
    if (this.props.modifiers !== prevProps.modifiers) {
      this.setState({
        error: _.includes(this.props.modifiers, `error`),
        success: _.includes(this.props.modifiers, `success`)
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
    const selectRef: HTMLElement = this.selectRef.current;
    const optionsRef: HTMLUListElement = this.optionsRef.current;

    const target: HTMLElement = event.target as HTMLElement;

    // select
    if (target.className === selectRef.className) {
      // 'Space', 'ArrowUp', 'ArrowDown' keys
      if (
        event.keyCode === 32 ||
        event.keyCode === 38 ||
        event.keyCode === 40
      ) {
        event.preventDefault();
        event.stopPropagation();

        this.setState({ active: true });
        this.focusOptionByValue(optionsRef, this.state.value);
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

        selectRef.focus();
      }

      // 'Esc' key
      if (event.keyCode === 27) {
        event.preventDefault();
        event.stopPropagation();

        this.setState({ active: false });

        selectRef.focus();
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

    const selectRef: HTMLElement = this.selectRef.current;
    const optionsRef: HTMLUListElement = this.optionsRef.current;

    const target: HTMLElement = event.target as HTMLElement;

    // select
    if (target.className === selectRef.className) {
      if (this.state.active) {
        this.setState({ active: false });
        target.focus();
      } else {
        this.setState({ active: true });
        this.focusOptionByValue(optionsRef, this.state.value);
      }

      // options
    } else if (target.className === namespace(`select__item`)) {
      this.setState(
        {
          active: false,
          value: target.getAttribute(`data-item`)
        },
        () => {
          this.handleChange();
        }
      );

      selectRef.focus();
    }
  };

  handleBlur = (event: React.FocusEvent): void => {
    event.preventDefault();
    event.stopPropagation();

    const target: HTMLElement = event.target as HTMLElement;
    const relatedTarget: HTMLElement =
      (event.relatedTarget as HTMLElement) ||
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
    const { options } = this.props;

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
      selectRef,
      optionsRef,
      handleChange,
      handleKeyDown,
      handleMouseDown,
      handleBlur,
      getLabelFromValue
    } = this;

    const bem = BEM(`select`);
    bem.addModifiers(state.error ? `error` : ``);
    bem.addModifiers(state.success ? `success` : ``);
    bem.addClassNames(state.value ? `selected` : ``);
    bem.addClassNames(state.active ? `active` : ``);
    bem.addClassNames(props.className);

    return (
      <div className={bem.getResult()} style={props.style}>
        <input
          id={id}
          className={`${bem.getElement(`input`)} ${bem.getModifier(
            `hidden`,
            `input`
          )}`}
          type="hidden"
          name={props.name}
          disabled={props.disabled}
          readOnly={props.readOnly}
          required={props.required}
          value={state.value}
          onChange={handleChange}
        />
        <span
          ref={selectRef}
          className={bem.getElement(`input`)}
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
                _.startsWith(`aeiou`, props.label) ? `an` : `a`
              } ${props.label.toLowerCase()}`
            : getLabelFromValue(state.value)}
        </span>
        <label className={bem.getElement(`label`)}>{props.label}</label>
        {!props.readOnly && <Icon type="chevron-down" />}
        {!props.readOnly && !props.disabled && (
          <div className={bem.getElement(`border`)} />
        )}
        {!props.readOnly && !props.disabled && (
          <div
            className={bem.getElement(`list-outer`)}
            tabIndex={-1}
            data-id={id}
            onBlur={handleBlur}>
            <ul className={bem.getElement(`list`)} ref={optionsRef}>
              {props.options.map((option, index) => {
                return (
                  <li
                    key={index}
                    className={bem.getElement(`item`)}
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
        {!props.readOnly && !props.disabled && props.message && (
          <span className={bem.getElement(`message`)}>{props.message}</span>
        )}
      </div>
    );
  }
}

export { Select as default };
