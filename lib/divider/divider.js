// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import namespace from '../utilities/js/namespace';

// * React component
const Divider = ({ modifiers, className, style }) => {
  let classNames = namespace('divider');

  modifiers && (classNames += ` ${namespace(modifiers)}`);
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
