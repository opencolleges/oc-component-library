// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import find from '../utils/find';
import prefix from '../utils/prefix';

// * child imports
import OCIcon from '../icon';

// * React component
const OCCard = ({ modifiers, children }) => {
  return (
    <div
      className={!modifiers ? prefix('card') : `${prefix(`card ${modifiers}`)}`}
      tabIndex={find('card--draggable', modifiers) ? 0 : null}>
      {find('card--draggable', modifiers) && (
        <OCIcon modifiers={`icon--draggable active`} />
      )}
      {children}
    </div>
  );
};

OCCard.propTypes = {
  children: PropTypes.node.isRequired,
  modifiers: PropTypes.string
};

export default OCCard;
