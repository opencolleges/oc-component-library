// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utils/prefix';

// * React component
const OCHeading = ({ level, modifiers, children }) => {
  const Tag = `h${level}`;

  return (
    <Tag className={!modifiers ? prefix(Tag) : prefix(`${Tag} ${modifiers}`)}>
      {children}
    </Tag>
  );
};

OCHeading.propTypes = {
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  modifiers: PropTypes.string,
  children: PropTypes.node.isRequired
};

OCHeading.defaultProps = {
  level: 1
};

export default OCHeading;
