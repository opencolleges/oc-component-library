// * React imports
import PropTypes from 'prop-types';
import React from 'react';

import OCCopy from '../copy';
import OCText from '../text';

// * utility imports
import prefix from '../utilities/js/prefix';

// * React component
const OCConfirmPassword = ({
  password,
  confirmPassword,
  passwordDisclaimer
}) => (
  <div className={prefix('confirm-password')}>
    {password &&
      confirmPassword &&
      [
        password,
        confirmPassword
      ].map(
        ({ id, name, label, type, required, value, modifiers, message }) => (
          <OCText
            id={id}
            key={id}
            label={label}
            name={name}
            required={required}
            type={type}
            modifiers={modifiers}
            message={message}
            value={value}
          />
        )
      )}
    {passwordDisclaimer !== null && (
      <OCCopy tag="small">{passwordDisclaimer}</OCCopy>
    )}
  </div>
);

OCConfirmPassword.propTypes = {
  password: PropTypes.object.isRequired,
  confirmPassword: PropTypes.object.isRequired,
  passwordDisclaimer: PropTypes.string
};

OCConfirmPassword.defaultProps = {
  passwordDisclaimer: null
};

export default OCConfirmPassword;
