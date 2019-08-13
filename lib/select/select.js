// * React imports
import React from 'react';
import PropTypes from 'prop-types';

// * utility imports
import find from '../utilities/js/find';
import prefix from '../utilities/js/prefix';
import getId from '../utilities/js/getId';
import isVowel from '../utilities/js/isVowel';

// * child imports
import OCIcon from '../icon';

// * React component
export default class OCSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      value: this.isValueExist(this.props.value) ? this.props.value : '',
      error: find('select--error', this.props.modifiers),
      success: find('select--success', this.props.modifiers),
      disabled: this.props.disabled
    };

    this.id = props.id ? props.id : getId();

    this.selectRef = React.createRef();
    this.optionsRef = React.createRef();
  }

  componentDidUpdate(previousProps, previousState) {
    if (this.props.modifiers !== previousProps.modifiers) {
      this.setState({
        error: find('select--error', this.props.modifiers),
        success: find('select--success', this.props.modifiers)
      });
    }

    if (this.props.disabled !== previousProps.disabled) {
      this.setState({
        disabled: this.props.disabled
      });
    }

    if (this.state.value !== previousState.value) {
      this.setState({
        error: false,
        success: false
      });
    }
  }

  handleChange = () => {
    this.props.onChange(this.state.value, this.props.name);
  };

  handleKeyDown = event => {
    const selectRef = this.selectRef.current;
    const optionsRef = this.optionsRef.current;

    const target = event.target || event.srcElement;

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

        if (this.state.value) {
          for (let index = 0; index < optionsRef.childNodes.length; index++) {
            if (
              optionsRef.childNodes[index].getAttribute('data-item') ===
              this.state.value
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
          value: target.getAttribute('data-item')
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

        target.previousSibling && target.previousSibling.focus();
      }

      // 'ArrowDown' key
      if (event.keyCode === 40) {
        event.preventDefault();
        event.stopPropagation();

        target.nextSibling && target.nextSibling.focus();
      }
    }
  };

  handleMouseDown = event => {
    event.preventDefault();
    event.stopPropagation();

    const selectRef = this.selectRef.current;
    const optionsRef = this.optionsRef.current;

    const target = event.target || event.srcElement;

    // select
    if (target.className === selectRef.className) {
      if (this.state.active) {
        this.setState({ active: false });

        target.focus();
      } else {
        this.setState({ active: true });

        if (this.state.value) {
          for (let index = 0; index < optionsRef.childNodes.length; index++) {
            if (
              optionsRef.childNodes[index].getAttribute('data-item') ===
              this.state.value
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
    } else if (target.className === prefix('select__item')) {
      this.setState(
        {
          active: false,
          value: target.getAttribute('data-item')
        },
        () => {
          this.handleChange();
        }
      );

      selectRef.focus();
    }
  };

  handleBlur = event => {
    event.preventDefault();
    event.stopPropagation();

    const target = event.target || event.srcElement;
    const relatedTarget = event.relatedTarget || document.activeElement;

    if (
      (relatedTarget !== null &&
        target.getAttribute('data-id') !==
          relatedTarget.getAttribute('data-id')) ||
      relatedTarget === null
    ) {
      this.setState({
        active: false
      });
    }
  };

  getLableFromValue = value => {
    const { options } = this.props;

    let label = '';
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === value) {
        label = options[i].label;
        break;
      }
    }

    return label;
  };

  isValueExist = value => {
    const { options } = this.props;
    let isExist = false;

    for (let i = 0; i < options.length; i++) {
      if (options[i].value === value) {
        isExist = true;
        break;
      }
    }

    return isExist;
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
      getLableFromValue
    } = this;

    let classNames = prefix('select');

    state.error && (classNames += ` ${prefix('select--error')}`);
    state.success && (classNames += ` ${prefix('select--success')}`);

    state.value && (classNames += ` ${prefix('selected')}`);
    state.active && (classNames += ` ${prefix('active')}`);

    props.className && (classNames += ` ${props.className}`);

    return (
      <div className={classNames} style={props.style}>
        <input
          id={id}
          className={prefix('select__input select__input--hidden')}
          type="hidden"
          name={props.name}
          disabled={state.disabled}
          readOnly={props.readOnly}
          required={props.required}
          value={state.value}
          onChange={handleChange}
        />
        <span
          ref={selectRef}
          className={prefix('select__input')}
          name={`select-${props.name}`}
          tabIndex={!props.readOnly && !state.disabled ? 0 : null}
          onKeyDown={!props.readOnly && !state.disabled ? handleKeyDown : null}
          onMouseDown={
            !props.readOnly && !state.disabled ? handleMouseDown : null
          }
          onTouchEnd={
            !props.readOnly && !state.disabled ? handleMouseDown : null
          }>
          {!state.value
            ? `Pick ${
                isVowel(props.label.charAt(0)) ? 'an' : 'a'
              } ${props.label.toLowerCase()}`
            : getLableFromValue(state.value)}
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
                    data-item={option.value}
                    onKeyDown={handleKeyDown}
                    onMouseDown={handleMouseDown}
                    onTouchEnd={handleMouseDown}
                    onBlur={handleBlur}>
                    {option.label}
                    {state.value === option.value ? (
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
        {!props.readOnly && !state.disabled && props.message && (
          <span className={prefix('select__message')}>{props.message}</span>
        )}
      </div>
    );
  }
}

OCSelect.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.string,
  modifiers: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any
    })
  ).isRequired,
  value: PropTypes.string,
  message: PropTypes.string,
  onChange: PropTypes.func
};

OCSelect.defaultProps = {
  onChange: () => {}
};
