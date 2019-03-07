// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utils/prefix';

// * React component
const OCTableBody = ({ children }) => {
  return <tbody className={prefix('tbody')}>{children}</tbody>;
};

OCTableBody.propTypes = {
  children: PropTypes.node.isRequired
};

export default OCTableBody;
