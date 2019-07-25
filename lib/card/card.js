// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import find from '../utilities/js/find';
import prefix from '../utilities/js/prefix';

// * child imports
import Icon from '../icon';

// * React component
const Card = ({ modifiers, className, style, tabIndex, link, children }) => {
  const Tag = typeof link === 'undefined' ? 'div' : 'a';

  link && (modifiers += ' card--clickable');

  let classNames = prefix('card');

  modifiers && (classNames += ` ${prefix(modifiers)}`);
  className && (classNames += ` ${className}`);

  return (
    <Tag
      className={classNames}
      style={style}
      href={link}
      tabIndex={
        (find('card--draggable', modifiers) ||
          find('card--clickable', modifiers)) &&
        tabIndex
          ? 0
          : null
      }>
      {find('card--draggable', modifiers) && (
        <Icon modifiers={`icon--draggable active`} />
      )}
      {children}
    </Tag>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  link: PropTypes.string,
  modifiers: PropTypes.string,
  tabIndex: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object
};

Card.defaultProps = {
  tabIndex: true
};

export default Card;
