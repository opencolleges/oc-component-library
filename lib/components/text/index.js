import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { prefix, uniqueId, find, remove } from '../utilities';

class OCText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: uniqueId(),
      remaining: this.props.characterCount,
      error: find('text--error', this.props.modifiers),
      success: find('text--success', this.props.modifiers),
      disabled: find('text--disabled', this.props.modifiers),
      readOnly: find('text--read-only', this.props.modifiers)
    };
  }

  componentDidUpdate(previousProps) {
    if (this.props.modifiers !== previousProps.modifiers) {
      this.setState({
        error: find('text--error', this.props.modifiers),
        success: find('text--success', this.props.modifiers),
        disabled: find('text--disabled', this.props.modifiers),
        readOnly: find('text--read-only', this.props.modifiers)
      });
    }
  }

  myCallBack = remain => {
    this.setState({ remaining: remain });
  };

  render() {
    const { props, state, myCallBack } = this;

    const modifiers = remove(
      ['text--disabled', 'text--read-only', 'text--required'],
      props.modifiers
    );

    return (
      <div
        className={
          !modifiers ? prefix('text') : `${prefix(`text ${modifiers}`)}`
        }>
        {props.tag === 'input' ? (
          <Input {...this.props} />
        ) : (
          <Textarea {...this.props} myCallBack={myCallBack} />
        )}
        <label className={prefix('text__label')}>{props.label}</label>
        {!state.disabled && !state.readOnly && (
          <div className={prefix('text__border')} />
        )}
        <span className={prefix('text__message')}>
          {props.tag === 'textarea'
            ? state.remaining <= 0
              ? `You've exceed ${props.characterCount} characters`
              : `${state.remaining} characters remaining`
            : null}
        </span>
      </div>
    );
  }
}

OCText.propTypes = {
  tag: PropTypes.oneOf(['input', 'textarea']),
  label: PropTypes.string.isRequired,
  modifiers: PropTypes.string,
  name: PropTypes.string
};

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value ? this.props.value : ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    const { props, state, handleChange, handleKeyDown } = this;

    return (
      <input
        className={
          !state.value ? prefix('text__input') : prefix('text__input active')
        }
        type={props.type}
        disabled={find('text--disabled', props.modifiers)}
        required={find('text--required', props.modifiers)}
        readOnly={find('text--read-only', props.modifiers)}
        autoComplete={props.autocomplete}
        autoFocus={props.autofocus}
        spellCheck={false}
        value={state.value}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        name={props.name}
      />
    );
  }
}

Input.propTypes = {
  type: PropTypes.oneOf(['email', 'password', 'tel', 'text', 'url']),
  autocomplete: PropTypes.oneOf([
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
  autofocus: PropTypes.bool,
  modifiers: PropTypes.string
};

Input.defaultProps = {
  type: 'text',
  autofocus: false
};

class Textarea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characterCount: 0,
      value: this.props.value ? this.props.value : '',
      remaining: this.props.characterCount
    };
  }

  handleChange = event => {
    let remainder = this.state.remaining - event.target.value.length;
    this.props.myCallBack(remainder);
    this.setState({
      value: event.target.value.substring(0, this.props.characterCount)
    });
  };

  render() {
    const { props, state, handleChange } = this;

    return (
      <textarea
        className={
          !state.value
            ? prefix('text__textarea')
            : prefix('text__textarea active')
        }
        disabled={find(`text--disabled`, props.modifiers)}
        required={find(`text--required`, props.modifiers)}
        readOnly={find(`text--read-only`, props.modifiers)}
        autoComplete={props.autocomplete}
        autoFocus={props.autofocus}
        value={state.value}
        onChange={handleChange}
        maxLength={this.props.characterCount}
        name={props.name}
      />
    );
  }
}

Textarea.propTypes = {
  autofocus: PropTypes.bool,
  modifiers: PropTypes.string,
  characterCount: PropTypes.number,
  myCallBack: PropTypes.func,
  name: PropTypes.string
};

export default OCText;
