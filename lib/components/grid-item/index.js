// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utils/prefix';

// * React component
const OCGridItem = ({ modifiers, children }) => {
  return (
    <div
      className={
        !modifiers ? prefix('grid__item') : prefix(`grid__item ${modifiers}`)
      }>
      {children}
    </div>
  );
};

OCGridItem.propTypes = {
  modifiers: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default OCGridItem;
