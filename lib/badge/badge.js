// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utilities/js/prefix';

// * React component
const Badge = ({ modifiers, className, style, value }) => {
  let classNames = prefix('badge');

  modifiers && (classNames += ` ${prefix(modifiers)}`);
  className && (classNames += ` ${className}`);

  let string = value;

  string > 99 && (string = '99+');
  string > 9 && (string = '9+');

  return (
    <span className={classNames} style={style} unselectable="on">
      {string}
    </span>
  );
};

Badge.propTypes = {
  modifiers: PropTypes.oneOf(['badge--error', 'badge--success']),
  className: PropTypes.string,
  style: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
};

Badge.defaultProps = {
  value: 1
};

export default Badge;
