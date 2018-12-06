import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { prefix, uniqueId, find } from '../utilities';
import OCIcon from '../icon';

class OCSelect extends Component {
  constructor(props) {
    super(props);

    this.selectRef = createRef();
    this.optionsRef = createRef();

    this.state = {
      id: uniqueId(),
      active: false,
      selection:
        this.props.options.indexOf(this.props.selection) !== -1
          ? this.props.selection
          : '',
      disabled: find('select--disabled', this.props.modifiers),
      readOnly: find('select--read-only', this.props.modifiers)
    };
  }

  componentDidUpdate(previousProps) {
    if (this.props.modifiers !== previousProps.modifiers) {
      this.setState({
        disabled: find('select--disabled', this.props.modifiers),
        readOnly: find('select--read-only', this.props.modifiers)
      });
    }
  }

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
      selectRef,
      optionsRef,
      state,
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
          className={prefix('select__input select__input--hidden')}
          type="hidden"
          name={props.name}
          value={state.selection}
          disabled={state.disabled}
          readOnly={state.readOnly}
          onChange={props.onChange}
        />
        <span
          className={prefix('select__input')}
          name={`select-${props.name}`}
          tabIndex={!state.disabled && !state.readOnly ? 0 : null}
          ref={selectRef}
          onKeyDown={!state.disabled && !state.readOnly ? handleKeyDown : null}
          onMouseDown={
            !state.disabled && !state.readOnly ? handleMouseDown : null
          }>
          {!state.selection
            ? `Pick a ${props.label.toLowerCase()}`
            : state.selection}
        </span>
        <label className={prefix('select__label')}>{props.label}</label>
        {!state.readOnly && <OCIcon modifiers="icon--chevron-down" />}
        {!state.disabled && !state.readOnly && (
          <div className={prefix('select__border')} />
        )}
        {!state.disabled && !state.readOnly && (
          <div
            className={prefix('select__list-outer')}
            tabIndex={-1}
            data-id={state.id}
            onBlur={handleBlur}>
            <ul className={prefix('select__list')} ref={optionsRef}>
              {props.options.map((option, index) => {
                return (
                  <li
                    key={index}
                    className={prefix('select__item')}
                    tabIndex={-1}
                    data-id={state.id}
                    data-item={option}
                    onKeyDown={handleKeyDown}
                    onMouseDown={handleMouseDown}
                    onBlur={handleBlur}>
                    {option}
                    {state.selection === option && (
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
  selection: PropTypes.string,
  options: PropTypes.array.isRequired,
  name: PropTypes.string,
  modifiers: PropTypes.string,
  onChange: PropTypes.func
};

export default OCSelect;
