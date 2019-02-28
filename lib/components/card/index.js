// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * sibling imports
import OCIcon from '../icon';

// * utility imports
import find from '../utils/find';
import prefix from '../utils/prefix';

// * React component
class OCCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { props } = this;

    return (
      <div
        className={
          !props.modifiers
            ? prefix('card')
            : `${prefix(`card ${props.modifiers}`)}`
        }
        tabIndex={find('card--draggable', props.modifiers) ? 0 : null}>
        {find('card--draggable', props.modifiers) && (
          <OCIcon modifiers={`icon--draggable active`} />
        )}
        {props.children}
      </div>
    );
  }
}

OCCard.propTypes = {
  children: PropTypes.node.isRequired,
  modifiers: PropTypes.string
};

export default OCCard;
