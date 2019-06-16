// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utilities/js/prefix';

// * React component
const OCGrid = ({ tag, modifiers, style, children }) => {
  const Tag = tag;

  return (
    <Tag
      className={!modifiers ? prefix('grid') : prefix(`grid ${modifiers}`)}
      style={style}>
      {children}
    </Tag>
  );
};

OCGrid.propTypes = {
  tag: PropTypes.oneOf(['div', 'section']),
  modifiers: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node.isRequired
};

OCGrid.defaultProps = {
  tag: 'div'
};

export default OCGrid;
