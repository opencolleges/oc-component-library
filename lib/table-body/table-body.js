// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import namespace from '../utilities/js/namespace';

// * React component
const TableBody = ({ className, style, children }) => {
  let classNames = namespace('tbody');

  className && (classNames += ` ${className}`);

  return (
    <tbody className={classNames} style={style}>
      {children}
    </tbody>
  );
};

TableBody.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node.isRequired
};

export default TableBody;
