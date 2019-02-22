import React from 'react';
import PropTypes from 'prop-types';
import { prefix, count } from '../utilities';

const OCBadge = ({ value, modifiers }) => {
  return (
    <span
      className={
        !modifiers ? prefix('badge') : `${prefix(`badge ${modifiers}`)}`
      }
      unselectable="on">
      {count(value)}
    </span>
  );
};

OCBadge.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  modifiers: PropTypes.oneOf(['badge--error', 'badge--success'])
};

OCBadge.defaultProps = {
  value: 1
};

export default OCBadge;
