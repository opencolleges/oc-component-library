// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utilities/js/prefix';

// * React component
const GridItem = ({ modifiers, className, style, children }) => {
  let classNames = prefix('grid__item');

  modifiers && (classNames += ` ${prefix(modifiers)}`);
  className && (classNames += ` ${className}`);

  return (
    <div className={classNames} style={style}>
      {children}
    </div>
  );
};

GridItem.propTypes = {
  modifiers: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node.isRequired
};

export default GridItem;
