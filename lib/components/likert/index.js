import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../utilities';
import { constructScale } from './utilities';
import { timingSafeEqual } from 'crypto';

class OCLikert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.scale = constructScale(this.props.range, this.props.options);
  }

  handleChange = event => {
    const target = event.target || event.srcElement;

    this.setState({
      value: target.value
    });
  };

  render() {
    const { props, state, scale, handleChange } = this;

    return (
      <div
        className={
          !props.modifiers
            ? prefix('likert')
            : `${prefix(`likert ${props.modifiers}`)}`
        }>
        <div className={prefix(`likert__list likert__list--${scale.length}`)}>
          {scale.map((option, index) => (
            <div
              key={index}
              className={
                index + 1 !== parseInt(state.value)
                  ? prefix('likert__item')
                  : prefix('likert__item active')
              }>
              <input
                id={option.id}
                className={prefix('likert__input')}
                type="radio"
                name={props.name}
                value={index + 1}
                tabIndex={0}
                onChange={handleChange}
              />
              <label
                htmlFor={option.id}
                className={prefix('likert__label-outer')}>
                <span className={prefix('likert__button')}>{index + 1}</span>
                {(index === 0 ||
                  index === scale.length - 1 ||
                  (scale.length % 2 &&
                    index === Math.floor(scale.length / 2)) ||
                  scale.length <= 5) && (
                  <span className={prefix('likert__label')}>
                    {option.label}
                  </span>
                )}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

OCLikert.protoTypes = {
  range: PropTypes.oneOf([3, 4, 5, 6, 7, 8, 9, 10]),
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
  modifiers: PropTypes.string
};

OCLikert.defaultProps = {
  range: 5
};

export default OCLikert;
