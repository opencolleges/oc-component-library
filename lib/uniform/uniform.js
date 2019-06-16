// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utilities/js/prefix';

// * vendor imports
import detectIt from 'detect-it';

// * React component
const OCUniform = ({ tag, style, children }) => {
  const Tag = tag;

  return (
    <Tag
      className={detectIt.hasMouse ? prefix('no-touchevents') : ''}
      style={style}>
      {children}
    </Tag>
  );
};

OCUniform.propTypes = {
  tag: PropTypes.oneOf(['div', 'main', 'section']),
  style: PropTypes.object,
  children: PropTypes.node.isRequired
};

OCUniform.defaultProps = {
  tag: 'main'
};

export default OCUniform;
