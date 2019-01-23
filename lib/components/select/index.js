import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { prefix, uniqueId } from '../utilities';
import OCIcon from '../icon';

class OCSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      selection:
        this.props.options.indexOf(this.props.selection) !== -1
          ? this.props.selection
          : '',
      disabled: this.props.disabled
    };

    this.id = props.id ? props.id : uniqueId();

    this.selectRef = createRef();
    this.optionsRef = createRef();
  }

  componentDidUpdate(previousProps) {
    if (this.props.disabled !== previousProps.disabled) {
      this.setState({
        disabled: this.props.disabled
      });
    }
  }

  handleChange = () => {
    // this.props.onChange(this.props.name, this.props.value);
  };

  handleKeyDown = event => {
    const selectRef = this.selectRef.current;
    const optionsRef = this.optionsRef.current;
    // select
    if (event.target.className === selectRef.className) {
      // 'Space', 'ArrowUp', 'ArrowDown' keys
      if (
        event.keyCode === 32 ||
        event.keyCode === 38 ||
        event.keyCode === 40
      ) {
        event.preventDefault();
        event.stopPropagation();

        this.setState({ active: true });

        if (this.state.selection) {
          for (let index = 0; index < optionsRef.childNodes.length; index++) {
            if (
              optionsRef.childNodes[index].getAttribute('data-item') ===
              this.state.selection
            ) {
              optionsRef.childNodes[index].focus();
              break;
            }
          }
        } else {
          optionsRef.firstChild.focus();
        }
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
          selection: event.target.getAttribute('data-item')
        });

        selectRef.focus();
      }

      //'Esc' key
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

        event.target.previousSibling && event.target.previousSibling.focus();
      }

      // 'ArrowDown' key
      if (event.keyCode === 40) {
        event.preventDefault();
        event.stopPropagation();

        event.target.nextSibling && event.target.nextSibling.focus();
      }
    }
  };

  handleMouseDown = event => {
    event.preventDefault();
    event.stopPropagation();

    const selectRef = this.selectRef.current;
    const optionsRef = this.optionsRef.current;

    // select
    if (event.target.className === selectRef.className) {
      if (this.state.active) {
        this.setState({ active: false });

        event.target.focus();
      } else {
        this.setState({ active: true });

        if (this.state.selection) {
          for (let index = 0; index < optionsRef.childNodes.length; index++) {
            if (
              optionsRef.childNodes[index].getAttribute('data-item') ===
              this.state.selection
            ) {
              optionsRef.childNodes[index].focus();
              break;
            }
          }
        } else {
          optionsRef.firstChild.focus();
        }
      }

      // options
    } else if (event.target.className === prefix('select__item')) {
      this.setState({
        active: false,
        selection: event.target.getAttribute('data-item')
      });

      selectRef.focus();
    }
  };

  handleBlur = event => {
    let relatedTarget = null;
    event.preventDefault();
    event.stopPropagation();

    if (event.relatedTarget === null) {
      relatedTarget = document.activeElement;
    } else {
      relatedTarget = event.relatedTarget;
    }

    if (
      (relatedTarget !== null &&
        event.target.getAttribute('data-id') !==
          relatedTarget.getAttribute('data-id')) ||
      relatedTarget === null
    ) {
      this.setState({
        active: false
      });
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
      handleBlur
    } = this;

    let hooks = '';

    state.selection && (hooks += 'selected ');
    state.active && (hooks += 'active');

    return (
      <div className={prefix(`select ${hooks}`)}>
        <input
          id={id}
          className={prefix('select__input select__input--hidden')}
          type="hidden"
          name={props.name}
          disabled={state.disabled}
          readOnly={props.readOnly}
          required={props.required}
          value={state.selection}
          onChange={handleChange}
        />
        <span
          ref={selectRef}
          className={prefix('select__input')}
          name={`select-${props.name}`}
          tabIndex={!props.readOnly && !state.disabled ? 0 : -1}
          onKeyDown={!props.readOnly && !state.disabled ? handleKeyDown : null}
          onMouseDown={
            !props.readOnly && !state.disabled ? handleMouseDown : null
          }>
          {!state.selection
            ? `Pick a ${props.label.toLowerCase()}`
            : state.selection}
        </span>
        <label className={prefix('select__label')}>{props.label}</label>
        {!props.readOnly && <OCIcon modifiers="icon--chevron-down active" />}
        {!props.readOnly && !state.disabled && (
          <div className={prefix('select__border')} />
        )}
        {!props.readOnly && !state.disabled && (
          <div
            className={prefix('select__list-outer')}
            tabIndex={-1}
            data-id={id}
            onBlur={handleBlur}>
            <ul className={prefix('select__list')} ref={optionsRef}>
              {props.options.map((option, index) => {
                return (
                  <li
                    key={index}
                    className={prefix('select__item')}
                    tabIndex={-1}
                    data-id={id}
                    data-item={option}
                    onKeyDown={handleKeyDown}
                    onMouseDown={handleMouseDown}
                    onBlur={handleBlur}>
                    {option}
                    {state.selection === option ? (
                      <OCIcon modifiers="icon--tick active" />
                    ) : (
                      <OCIcon modifiers="icon--tick" />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

OCSelect.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  id: PropTypes.string,
  modifiers: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  options: PropTypes.array.isRequired,
  selection: PropTypes.string,
  onChange: PropTypes.func
};

export default OCSelect;
