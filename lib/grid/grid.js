// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import namespace from '../utilities/js/namespace';

// * React component
const Grid = ({ tag, modifiers, className, style, maxWidth, children }) => {
  const Tag = tag;

  let classNames = namespace('grid');

  modifiers && (classNames += ` ${namespace(modifiers)}`);
  className && (classNames += ` ${className}`);

  return (
    <Tag
      className={classNames}
      style={maxWidth ? style : { maxWidth: '100%', ...style }}>
      {children}
    </Tag>
  );
};

Grid.propTypes = {
  tag: PropTypes.oneOf(['div', 'section']),
  modifiers: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  maxWidth: PropTypes.bool,
  children: PropTypes.node.isRequired
};

Grid.defaultProps = {
  tag: 'div',
  maxWidth: true
};

export default Grid;
