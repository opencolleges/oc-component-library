// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utilities/js/prefix';

// * React component
const OCTableHead = ({ className, style, children }) => {
  let classNames = prefix('thead');

  className && (classNames += ` ${className}`);

  return (
    <thead className={classNames} style={style}>
      {children}
    </thead>
  );
};

OCTableHead.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node.isRequired
};

export default OCTableHead;
