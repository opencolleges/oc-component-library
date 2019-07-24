// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utilities/js/prefix';

// * React component
const Divider = ({ modifiers, className, style }) => {
  let classNames = prefix('divider');

  modifiers && (classNames += ` ${prefix(modifiers)}`);
  className && (classNames += ` ${className}`);

  return <div className={classNames} style={style} />;
};

Divider.propTypes = {
  modifiers: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
};

Divider.defaultProps = {
  modifiers: 'divider--s'
};

export default Divider;
