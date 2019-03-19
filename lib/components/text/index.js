// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import find from '../utils/find';
import prefix from '../utils/prefix';
import remove from '../utils/remove';
import getId from '../utils/getId';

// * child imports
import OCIcon from '../icon';

// * React component
export default class OCText extends React.Component {
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

    this.id = this.props.id ? this.props.id : getId();
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
    }
  }

  handleFocus = event => {
    const target = event.target || event.srcElement;

    // * select the input's value

    target.select();

    // * If the input type is password, then set the keyStrokes state to:
    // * false.

    this.props.type === 'password' && this.setState({ keyStrokes: false });
  };

  handleKeyDown = event => {
    const key = event.keyCode;

    // * If the input type is password, there have been no previous key strokes
    // * since focus and the backspace or delete keys are pressed, then set the
    // * value state to: ''.

    this.props.type === 'password' &&
      !this.state.keyStrokes &&
      (key === 8 || key === 46) &&
      this.setState({ value: '' });
  };

  handleChange = event => {
    const target = event.target || event.srcElement;

    this.setState({ value: target.value });

    // * If the input type is password, then set the keyStrokes state to: true.

    this.props.type === 'password' && this.setState({ keyStrokes: true });

    this.props.onChange(this.props.name, target.value);
  };

  render() {
    const { props, state, id, handleFocus, handleKeyDown, handleChange } = this;

    const modifiers = remove(['text--error', 'text--success'], props.modifiers);

    let hooks = '';

    state.error && (hooks += 'text--error ');
    state.success && (hooks += 'text--success');

    return (
      <div
        className={
          !modifiers
            ? prefix(`text ${hooks}`)
            : `${prefix(`text ${modifiers} ${hooks}`)}`
        }>
        <input
          id={id}
          className={
            !state.value ? prefix('text__input') : prefix('text__input active')
          }
          type={props.type}
          name={props.name}
          disabled={state.disabled}
          readOnly={props.readOnly}
          required={props.required}
          autoComplete={props.autoComplete}
          autoFocus={props.autoFocus}
          maxLength={
            props.maxLength && props.maxLength > 0 ? props.maxLength : null
          }
          spellCheck={false}
          value={state.value}
          tabIndex={!props.readOnly && !state.disabled ? 0 : -1}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />
        <label className={prefix('text__label')}>{props.label}</label>
        {!props.readOnly && !state.disabled && (
          <OCIcon modifiers={`icon--close ${state.error ? 'active' : ''}`} />
        )}
        {!props.readOnly && !state.disabled && (
          <OCIcon modifiers={`icon--tick ${state.success ? 'active' : ''}`} />
        )}
        {!props.readOnly && !state.disabled && (
          <div className={prefix('text__border')} />
        )}
        {!props.readOnly && !state.disabled && (
          <span className={prefix('text__message')}>{/* something */}</span>
        )}
      </div>
    );
  }
}

OCText.propTypes = {
  type: PropTypes.oneOf(['email', 'number', 'password', 'tel', 'text', 'url']),
  label: PropTypes.string.isRequired,
  name: PropTypes.PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  modifiers: PropTypes.string,
  value: PropTypes.string,
  maxLength: PropTypes.number,
  autoComplete: PropTypes.oneOf([
    'on',
    'off',
    'name',
    'honorific-prefix',
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
  onChange: PropTypes.func
};

OCText.defaultProps = {
  type: 'text'
};
