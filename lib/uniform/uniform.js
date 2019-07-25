// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utilities/js/prefix';
import getUITheme from '../utilities/js/getUITheme';

// * vendor imports
import detectIt from 'detect-it';

// * React component
const Uniform = ({ tag, className, style, children }) => {
  const Tag = tag;

  const UITheme = getUITheme();

  let classNames = prefix(UITheme);

  detectIt.hasMouse && (classNames += ` ${prefix('no-touchevents')}`);

  className && (classNames += ` ${className}`);

  return (
    <Tag className={classNames} style={style}>
      {children}
    </Tag>
  );
};

Uniform.propTypes = {
  tag: PropTypes.oneOf(['div', 'main', 'section']),
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node.isRequired
};

Uniform.defaultProps = {
  tag: 'main'
};

export default Uniform;
