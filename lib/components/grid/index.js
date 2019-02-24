import PropTypes from 'prop-types';
import React from 'react';

import { prefix } from '../utilities';

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
