// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utilities/js/prefix';

// * React component
const OCTableHead = ({ style, children }) => {
  return (
    <thead className={prefix('thead')} style={style}>
      {children}
    </thead>
  );
};

OCTableHead.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node.isRequired
};

export default OCTableHead;
