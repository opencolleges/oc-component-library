// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utilities/js/prefix';

// * React component
const Heading = ({ level, modifiers, className, style, children }) => {
  const Tag = `h${level}`;

  let classNames = prefix(Tag);

  modifiers && (classNames += ` ${prefix(modifiers)}`);
  className && (classNames += ` ${className}`);

  return (
    <Tag className={classNames} style={style}>
      {children}
    </Tag>
  );
};

Heading.propTypes = {
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  modifiers: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node.isRequired
};

Heading.defaultProps = {
  level: 1
};

export default Heading;
