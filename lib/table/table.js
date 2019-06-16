// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utilities/js/prefix';

// * React component
const OCTable = ({ modifiers, style, width, children }) => {
  return (
    <table
      className={
        !modifiers ? prefix('table') : `${prefix(`table ${modifiers}`)}`
      }
      style={style}
      width={width ? width : null}>
      {children}
    </table>
  );
};

OCTable.propTypes = {
  modifiers: PropTypes.string,
  style: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  children: PropTypes.node.isRequired
};

export default OCTable;
