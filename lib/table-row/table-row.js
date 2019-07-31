// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import namespace from '../utilities/js/namespace';

// * React component
const TableRow = ({ modifiers, className, style, children }) => {
  let classNames = namespace('tr');

  modifiers && (classNames += ` ${namespace(modifiers)}`);
  className && (classNames += ` ${className}`);

  return (
    <tr className={classNames} style={style}>
      {children}
    </tr>
  );
};

TableRow.propTypes = {
  modifiers: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node.isRequired
};

export default TableRow;
