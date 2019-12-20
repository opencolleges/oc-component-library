// * React imports
import PropTypes from 'prop-types';
import React from 'react';

import OCCopy from '../copy';
import OCText from '../text';

// * utility imports
import prefix from '../utilities/js/prefix';

// * React component
export default class OCConfirmPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: this.props.fields.map(field => {
        if (typeof field.value === 'undefined') {
          return { ...field, value: '' };
        }
        return field;
      }),
      isFormValid: false,
      isFormSubmitted: false
    };

    this.ERROR_MODIFIER = 'text--error';
    this.MESSAGE_REQUIRED_FIELD = this.props.messageRequiredField
      ? this.props.messageRequiredField
      : 'Field required';
    this.MESSAGE_PASSWORD_NOT_MATCHING = this.props.messagePasswordNotMatching
      ? this.props.messagePasswordNotMatching
      : 'Passwords do not match';
    this.MESSAGE_REGEX_NOT_MATCHING = this.props.messageRegexNotMatching
      ? this.props.messageRegexNotMatching
      : 'Password not meeting requirements';
    this.PASSWORD_PATTERN_REGEX = this.props.passwordPatternRegex
      ? new RegExp(this.props.passwordPatternRegex, 'g')
      : new RegExp('^.+$', 'g');
    this.PASSWORD_PATTERN_DISCLAIMER = this.props.passwordPatternDisclaimer
      ? this.props.passwordPatternDisclaimer
      : null;
  }

  componentDidMount() {
    this.checkFormSubmission();
  }

  componentDidUpdate() {
    this.checkFormSubmission();
  }

  checkFormSubmission = () => {
    const { props, state } = this;
    if (props.isFormSubmitted && !state.isFormSubmitted) {
      this.handleFormValidation();
      this.setState({ isFormSubmitted: true });
    }
  };

  handleFieldValidation = field => {
    const {
      state,
      ERROR_MODIFIER,
      MESSAGE_REQUIRED_FIELD,
      MESSAGE_PASSWORD_NOT_MATCHING,
      MESSAGE_REGEX_NOT_MATCHING,
      PASSWORD_PATTERN_REGEX
    } = this;

    let modifiers = '';
    let message = '';

    const passwordFieldValue = state.fields[0].value;
    const passwordFieldId = state.fields[0].id;

    if (field.value === '' && field.required) {
      modifiers = ERROR_MODIFIER;
      message = MESSAGE_REQUIRED_FIELD;
    } else if (
      field.value !== '' &&
      !field.value.match(PASSWORD_PATTERN_REGEX)
    ) {
      modifiers = ERROR_MODIFIER;
      message = MESSAGE_REGEX_NOT_MATCHING;
    } else if (passwordFieldId !== field.id) {
      if (field.value !== passwordFieldValue) {
        modifiers = ERROR_MODIFIER;
        message = MESSAGE_PASSWORD_NOT_MATCHING;
      }
    }

    return {
      modifiers,
      message
    };
  };

  handleFormValidation = () => {
    const { state } = this;
    let modifiers = '';
    let message = '';

    const fields = state.fields.map(field => {
      ({ modifiers, message } = this.handleFieldValidation(field));
      return {
        ...field,
        modifiers,
        message
      };
    });

    this.setState({
      isFormValid: modifiers === '' && message === '',
      fields
    });
  };

  handleChange = (e, value) => {
    const { state } = this;
    const { target } = e;

    const fields = state.fields.map(field => {
      if (field.id === target.id) {
        let { modifiers, message } = this.handleFieldValidation(field);
        return {
          ...field,
          value,
          modifiers,
          message
        };
      }
      return field;
    });

    this.setState({ fields });
  };

  handleBlur = e => {
    const { state } = this;
    this.handleChange(e, e.target.value);
    if (state.isFormSubmitted) {
      this.handleFormValidation();
    }
  };

  render() {
    const { props, state, handleChange, handleBlur } = this;

    let classNames = prefix('confirm-password');

    props.modifiers && (classNames += ` ${prefix(props.modifiers)}`);
    props.className && (classNames += ` ${props.className}`);

    return (
      <div className={classNames} style={props.style}>
        {state.fields &&
          state.fields.map(
            ({
              id,
              name,
              label,
              type,
              required,
              value = '',
              modifiers,
              message
            }) => (
              <OCText
                id={id}
                key={id}
                label={label}
                name={name}
                required={required}
                type={type}
                modifiers={modifiers}
                message={message}
                onChange={handleChange}
                onBlur={handleBlur}
                value={value}
              />
            )
          )}
        {this.PASSWORD_PATTERN_DISCLAIMER !== null && (
          <OCCopy tag="small">{this.PASSWORD_PATTERN_DISCLAIMER}</OCCopy>
        )}
      </div>
    );
  }
}

OCConfirmPassword.propTypes = {
  modifiers: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFormSubmitted: PropTypes.bool,
  passwordPatternRegex: PropTypes.string,
  passwordPatternDisclaimer: PropTypes.string,
  messageRequiredField: PropTypes.string,
  messagePasswordNotMatching: PropTypes.string,
  messageRegexNotMatching: PropTypes.string
};

OCConfirmPassword.defaultProps = {
  fields: []
};
