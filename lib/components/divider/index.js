import React from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../utilities';

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
  modifiers: 'divider--m'
};

export default OCDivider;
