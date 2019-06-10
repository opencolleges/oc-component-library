// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utilities/js/prefix';

// * React component
const OCGridItem = ({ modifiers, style, children }) => {
  return (
    <div
      className={
        !modifiers ? prefix('grid__item') : prefix(`grid__item ${modifiers}`)
      }
      style={style}>
      {children}
    </div>
  );
};

OCGridItem.propTypes = {
  modifiers: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node.isRequired
};

export default OCGridItem;
