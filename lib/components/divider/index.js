// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utils/prefix';

// * style imports
import './divider.scss';

// * React component
const OCDivider = ({ modifiers }) => {
  return (
    <div
      className={
        !modifiers ? prefix('divider') : `${prefix(`divider ${modifiers}`)}`
      }
    />
  );
};

OCDivider.propTypes = {
  modifiers: PropTypes.string
};

OCDivider.defaultProps = {
  modifiers: 'divider--s'
};

export default OCDivider;
