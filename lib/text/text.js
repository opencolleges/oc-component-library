import PropTypes from 'prop-types';
import React from 'react';

import * as _ from 'lodash';

import { NAMESPACE } from '../utilities/js/constants';

import find from '../utilities/js/find';
import namespace from '../utilities/js/namespace';
import remove from '../utilities/js/remove';

// * child imports
import Icon from '../icon';

// * React component
export default class Text extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
        ? this.props.maxLength && this.props.maxLength > 0
          ? this.props.value.length < this.props.maxLength
            ? this.props.value
            : this.props.value.substring(0, this.props.maxLength)
          : this.props.value
        : '',
      keyStrokes: this.props.type === 'password' ? false : null,
      error: find('text--error', this.props.modifiers),
      success: find('text--success', this.props.modifiers),
      disabled: this.props.disabled
    };

    this.id = this.props.id ? this.props.id : _.uniqueId(`${NAMESPACE}-`);
  }
  static getDerivedStateFromProps(nextProps, nextState) {
    if (nextProps.value !== nextState.value) {
      return {
        value: nextProps.value
      };
    }
    return null;
  }
  shouldComponentUpdate(nextProps) {
    if (this.state.value === nextProps.value) {
      return false;
    }

    return true;
  }

  componentDidUpdate(previousProps, previousState) {
    if (this.props.modifiers !== previousProps.modifiers) {
      this.setState({
        error: find('text--error', this.props.modifiers),
        success: find('text--success', this.props.modifiers)
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

      // ! Not ideal.
      this.forceUpdate();
    }

    if (
      this.props.value !== previousProps.value //||
      //this.props.value !== this.state.value
    ) {
      this.setState({
        value: this.props.value
      });
    }
  }

  handleFocus = event => {
    const { onFocus } = this.props;
    const target = event.target || event.srcElement;

    // * select the input's value
    //this.props.onBlur(event);
    target.select();

    // * If the input type is password, then set the keyStrokes state to:
    // * false.

    this.props.type === 'password' && this.setState({ keyStrokes: false });

    onFocus(event);
  };

  handleKeyDown = event => {
    // * event.keycode conflates keys on mobile keypad.
    const key = event.key;

    // * If the input type is password, there have been no previous key strokes
    // * since focus and the backspace or delete keys are pressed, then set the
    // * value state to: ''.

    this.props.type === 'password' &&
      !this.state.keyStrokes &&
      (key === 'Backspace' || key === 'Delete') &&
      this.setState({ value: '' });

    // * If the input type is number, then prevent any other keys from
    // * leaking into the input's value.

    if (this.props.type === 'number') {
      const validKeys = [
        'Backspace',
        'Tab',
        'ArrowLeft',
        'ArrowUp',
        'ArrowRight',
        'ArrowDown',
        'Delete',
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        // * Mathematical operators
        '-',
        '+',
        // * Allows selct all functionality.
        'a',
        // * Allows copy, paste and cut functionality.
        'c',
        'v',
        'x'
      ];

      if (validKeys.indexOf(key) === -1) {
        event.preventDefault();
      }
    }
  };

  handleChange = event => {
    const target = event.target || event.srcElement;

    this.setState({ value: target.value });

    // * If the input type is password, then set the keyStrokes state to: true.

    this.props.type === 'password' && this.setState({ keyStrokes: true });

    this.props.onChange(event, target.value, this.props.name);
  };

  render() {
    const { props, state, id, handleFocus, handleKeyDown, handleChange } = this;

    const modifiers = remove(['text--error', 'text--success'], props.modifiers);

    let classNames = namespace('text');

    modifiers && (classNames += ` ${namespace(modifiers)}`);

    state.error && (classNames += ` ${namespace('text--error')}`);
    state.success && (classNames += ` ${namespace('text--success')}`);

    props.className && (classNames += ` ${props.className}`);

    return (
      <div className={classNames} style={props.style}>
        <input
          id={id}
          className={
            !state.value
              ? namespace('text__input')
              : namespace('text__input active')
          }
          type={props.type}
          ref={props.inputRef}
          name={props.name}
          disabled={state.disabled}
          readOnly={props.readOnly}
          required={props.required}
          autoComplete={props.autoComplete}
          autoFocus={props.autoFocus}
          maxLength={
            props.maxLength && props.maxLength > 0 ? props.maxLength : null
          }
          placeholder={props.type !== 'password' ? props.placeholder : null}
          spellCheck={props.spellCheck}
          value={state.value}
          tabIndex={!props.readOnly && !state.disabled ? 0 : -1}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          onBlur={e => props.onBlur(e)}
          onPaste={e => props.onPaste(e)}
        />
        <label className={namespace('text__label')}>{props.label}</label>
        {!props.readOnly && !state.disabled && (
          <Icon modifiers={`icon--close ${state.error ? 'active' : ''}`} />
        )}
        {!props.readOnly && !state.disabled && (
          <Icon modifiers={`icon--tick ${state.success ? 'active' : ''}`} />
        )}
        {!props.readOnly && !state.disabled && (
          <div className={namespace('text__border')} />
        )}
        {!props.readOnly && !state.disabled && props.message && (
          <span className={namespace('text__message')}>{props.message}</span>
        )}
      </div>
    );
  }
}

Text.propTypes = {
  type: PropTypes.oneOf(['email', 'number', 'password', 'tel', 'text', 'url']),
  label: PropTypes.string.isRequired,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  modifiers: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  value: PropTypes.string,
  maxLength: PropTypes.number,
  autoComplete: PropTypes.oneOf([
    'on',
    'off',
    'name',
    'honorific-namespace',
    'given-name',
    'additional-name',
    'family-name',
    'honorific-suffix',
    'nickname',
    'email',
    'username',
    'new-password',
    'current-password',
    'organization-title',
    'organization',
    'street-address',
    'address-line1',
    'address-line2',
    'address-line3',
    'address-level4',
    'address-level3',
    'address-level2',
    'address-level1',
    'country',
    'country-name',
    'postal-code',
    'cc-name',
    'cc-given-name',
    'cc-additional-name',
    'cc-family-name',
    'cc-number',
    'cc-exp',
    'cc-exp-month',
    'cc-exp-year',
    'cc-csc',
    'cc-type',
    'transaction-currency',
    'transaction-amount',
    'language',
    'bday',
    'bday-day',
    'bday-month',
    'bday-year',
    'sex',
    'tel',
    'tel-country-code',
    'tel-national',
    'tel-area-code',
    'tel-local',
    'tel-extension',
    'impp',
    'url',
    'photo'
  ]),
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  spellCheck: PropTypes.bool,
  message: PropTypes.string,
  onChange: PropTypes.func,
  inputRef: PropTypes.func,
  onMouseDown: PropTypes.func,
  onPaste: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
};

Text.defaultProps = {
  type: 'text',
  spellCheck: false,
  inputRef: () => {},
  onChange: () => {},
  onMouseDown: () => {},
  onPaste: () => {},
  onFocus: () => {},
  onBlur: () => {}
};
