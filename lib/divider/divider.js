// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utilities/js/prefix';

// * React component
const OCDivider = ({ modifiers, style }) => {
  return (
    <div
      className={
        !modifiers ? prefix('divider') : `${prefix(`divider ${modifiers}`)}`
      }
      style={style}
    />
  );
};

OCDivider.propTypes = {
  modifiers: PropTypes.string,
  style: PropTypes.object
};

OCDivider.defaultProps = {
  modifiers: 'divider--s'
};

export default OCDivider;
