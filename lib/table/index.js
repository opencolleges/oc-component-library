// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utils/prefix';

// * React component
const OCTable = ({ modifiers, width, children }) => {
  return (
    <table
      className={
        !modifiers ? prefix('table') : `${prefix(`table ${modifiers}`)}`
      }
      width={width ? width : null}>
      {children}
    </table>
  );
};

OCTable.propTypes = {
  modifiers: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  children: PropTypes.node.isRequired
};

export default OCTable;
