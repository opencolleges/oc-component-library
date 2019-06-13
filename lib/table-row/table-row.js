// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utilities/js/prefix';

// * React component
const OCTableRow = ({ modifiers, children }) => {
  return (
    <tr className={!modifiers ? prefix('tr') : prefix(`tr ${modifiers}`)}>
      {children}
    </tr>
  );
};

OCTableRow.propTypes = {
  children: PropTypes.node.isRequired,
  modifiers: PropTypes.string
};

export default OCTableRow;