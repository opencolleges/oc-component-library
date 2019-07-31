// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import namespace from '../utilities/js/namespace';

// * React component
const TableHead = ({ className, style, children }) => {
  let classNames = namespace('thead');

  className && (classNames += ` ${className}`);

  return (
    <thead className={classNames} style={style}>
      {children}
    </thead>
  );
};

TableHead.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node.isRequired
};

export default TableHead;
