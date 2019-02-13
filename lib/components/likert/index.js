import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../utilities';

class OCLikert extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { props } = this;

    return (
      <div
        className={
          !props.modifiers
            ? prefix('likert')
            : `${prefix(`likert ${props.modifiers}`)}`
        }>
        <ul className={prefix('likert__list')}>
          <li className={prefix('likert__item')}>
            <input className={prefix('likert__input')} />
            <label className={prefix('likert__label')}>asdasd</label>
          </li>
        </ul>
      </div>
    );
  }
}

OCHeading.protoTypes = {
  range: PropTypes.oneOf([3, 4, 5, 6, 7, 8, 9, 10]),
  modifiers: PropTypes.string
};

OCHeading.defaultProps = {
  range: 5
};

export default OCLikert;
