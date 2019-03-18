// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utils/prefix';

// * style imports
import './badge.scss';

// * React component
const OCBadge = ({ modifiers, value }) => {
  let string = value;

  string > 99 && (string = '99+');
  string > 9 && (string = '9+');

  return (
    <span
      className={
        !modifiers ? prefix('badge') : `${prefix(`badge ${modifiers}`)}`
      }
      unselectable="on">
      {string}
    </span>
  );
};

OCBadge.propTypes = {
  modifiers: PropTypes.oneOf(['badge--error', 'badge--success']),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
};

OCBadge.defaultProps = {
  value: 1
};

export default OCBadge;
