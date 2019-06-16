// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utilities/js/prefix';

// * React component
const OCTableBody = ({ className, style, children }) => {
  let classNames = prefix('tbody');

  className && (classNames += ` ${className}`);

  return (
    <tbody className={classNames} style={style}>
      {children}
    </tbody>
  );
};

OCTableBody.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node.isRequired
};

export default OCTableBody;
