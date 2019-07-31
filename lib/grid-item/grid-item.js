// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import namespace from '../utilities/js/namespace';

// * React component
const GridItem = ({ modifiers, className, style, children }) => {
  let classNames = namespace('grid__item');

  modifiers && (classNames += ` ${namespace(modifiers)}`);
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
