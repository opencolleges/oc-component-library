// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import find from '../utilities/js/find';
import prefix from '../utilities/js/prefix';

// * child imports
import OCIcon from '../icon';

// * React component
const OCCard = ({ modifiers, style, link, children }) => {
  const Tag = typeof link === 'undefined' ? 'div' : 'a';

  return (
    <Tag
      className={!modifiers ? prefix('card') : `${prefix(`card ${modifiers}`)}`}
      style={style}
      href={link}
      tabIndex={find('card--draggable', modifiers) ? 0 : null}>
      {find('card--draggable', modifiers) && (
        <OCIcon modifiers={`icon--draggable active`} />
      )}
      {children}
    </Tag>
  );
};

OCCard.propTypes = {
  children: PropTypes.node.isRequired,
  link: PropTypes.string,
  modifiers: PropTypes.string,
  style: PropTypes.object
};

export default OCCard;
