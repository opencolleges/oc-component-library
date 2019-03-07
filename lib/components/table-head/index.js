// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utils/prefix';

// * React component
const OCTableHead = ({ children }) => {
  return <thead className={prefix('thead')}>{children}</thead>;
};

OCTableHead.propTypes = {
  children: PropTypes.node.isRequired
};

export default OCTableHead;
