import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { prefix, find } from '../utilities';
import OCIcon from '../icon';

class OCCard extends Component {
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
