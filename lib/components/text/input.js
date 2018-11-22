import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { prefix, find } from '../utilities';

class OCInput extends Component {
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

  // focusNextElement = function() {
  //   //add all elements we want to include in our selection
  //   var focussableElements =
  //     'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), input[type=password]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
  //   if (document.activeElement && document.activeElement.form) {
  //     var focussable = Array.prototype.filter.call(
  //       document.activeElement.form.querySelectorAll(focussableElements),
  //       function(element) {
  //         //check for visibility while always include the current activeElement
  //         return (
  //           element.offsetWidth > 0 ||
  //           element.offsetHeight > 0 ||
  //           element === document.activeElement
  //         );
  //       }
  //     );
  //     var index = focussable.indexOf(document.activeElement);
  //     if (index > -1) {
  //       var nextElement = focussable[index + 1] || focussable[0];
  //       nextElement.focus();
  //     }
  //   }
  // };

  // handleKeyDown = e => {
  //   // 'Enter' key
  //   if (e.keyCode === 13) {
  //     e.preventDefault();
  //     this.focusNextElement();
  //   }
  // };

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

OCInput.propTypes = {
  type: PropTypes.oneOf(['email', 'password', 'search', 'tel', 'text', 'url']),
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

OCInput.defaultProps = {
  type: 'text',
  autofocus: false
};

export default OCInput;
