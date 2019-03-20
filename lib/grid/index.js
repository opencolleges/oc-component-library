// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utils/prefix';

// * React component
const OCGrid = ({ tag, modifiers, children }) => {
  const Tag = tag;

  return (
    <Tag className={!modifiers ? prefix('grid') : prefix(`grid ${modifiers}`)}>
      {children}
    </Tag>
  );
};

OCGrid.propTypes = {
  tag: PropTypes.oneOf(['div', 'section']),
  modifiers: PropTypes.string,
  children: PropTypes.node.isRequired
};

OCGrid.defaultProps = {
  tag: 'div'
};

export default OCGrid;
