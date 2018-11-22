import React from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../utilities';

const OCCard = ({ modifiers, children }) => {
  return (
    <div
      className={
        !modifiers ? prefix('card') : `${prefix(`card ${modifiers}`)}`
      }>
      {children}
    </div>
  );
};

OCCard.propTypes = {
  children: PropTypes.node.isRequired,
  modifiers: PropTypes.string
};

export default OCCard;
