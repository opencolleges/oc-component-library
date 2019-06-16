// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utilities/js/prefix';

// * React component
const OCDivider = ({ modifiers, className, style }) => {
  let classNames = prefix('divider');

  modifiers && (classNames += ` ${prefix(modifiers)}`);
  className && (classNames += ` ${className}`);

  return <div className={classNames} style={style} />;
};

OCDivider.propTypes = {
  modifiers: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
};

OCDivider.defaultProps = {
  modifiers: 'divider--s'
};

export default OCDivider;
