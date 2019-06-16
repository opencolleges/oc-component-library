// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utilities/js/prefix';

// * React component
const OCTableBody = ({ style, children }) => {
  return (
    <tbody className={prefix('tbody')} style={style}>
      {children}
    </tbody>
  );
};

OCTableBody.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node.isRequired
};

export default OCTableBody;
