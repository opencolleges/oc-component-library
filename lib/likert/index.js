// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utils/prefix';
import constructScale from '../utils/getLikertScale';

// * React component
export default class OCLikert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.scale = constructScale(this.props.options);
  }

  handleChange = event => {
    const target = event.target || event.srcElement;

    this.setState({
      value: target.value
    });

    // this.props.onChange(this.props.value, this.props.name);
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
              <div className={prefix('likert__label-outer')}>
                <label htmlFor={option.id} className={prefix('likert__button')}>
                  {index + 1}
                </label>
                {option.label &&
                  (index === 0 ||
                    index === scale.length - 1 ||
                    (scale.length % 2 &&
                      index === Math.floor(scale.length / 2)) ||
                    scale.length <= 5) && (
                    <span className={prefix('likert__label')}>
                      {option.label}
                    </span>
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

OCLikert.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string }))
    .isRequired,
  name: PropTypes.string.isRequired,
  modifiers: PropTypes.string,
  onChange: PropTypes.func
};

OCLikert.defaultProps = {
  options: [
    { label: 'Unlikely' },
    {},
    { label: 'Neutral' },
    {},
    { label: 'Likely' }
  ],
  onChange: () => {}
};
