// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utilities/js/prefix';

// * React component
const OCTableRow = ({ modifiers, style, children }) => {
  return (
    <tr
      className={!modifiers ? prefix('tr') : prefix(`tr ${modifiers}`)}
      style={style}>
      {children}
    </tr>
  );
};

OCTableRow.propTypes = {
  modifiers: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node.isRequired
};

export default OCTableRow;
