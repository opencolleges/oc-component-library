// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utilities/js/prefix';

// * React component
const OCGrid = ({ tag, modifiers, className, style, maxWidth, children }) => {
  const Tag = tag;

  let classNames = prefix('grid');

  modifiers && (classNames += ` ${prefix(modifiers)}`);
  className && (classNames += ` ${className}`);

  return (
    <Tag className={classNames} style={{ maxWidth: maxWidth, ...style }}>
      {children}
    </Tag>
  );
};

OCGrid.propTypes = {
  tag: PropTypes.oneOf(['div', 'section']),
  modifiers: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  maxWidth: PropTypes.string,
  children: PropTypes.node.isRequired
};

OCGrid.defaultProps = {
  tag: 'div',
  maxWidth: '960px'
};

export default OCGrid;
