// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import namespace from '../utilities/ts/namespace';
import constructScale from '../utilities/ts/getLikertScale';

// * React component
export default class Likert extends React.Component {
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

    let classNames = namespace('likert');

    props.modifiers && (classNames += ` ${namespace(props.modifiers)}`);
    props.className && (classNames += ` ${props.className}`);

    return (
      <div className={classNames} style={props.style}>
        <div
          className={namespace(`likert__list likert__list--${scale.length}`)}>
          {scale.map((option, index) => (
            <div
              key={index}
              className={
                index + 1 !== parseInt(state.value)
                  ? namespace('likert__item')
                  : namespace('likert__item active')
              }>
              <input
                id={option.id}
                className={namespace('likert__input')}
                type="radio"
                name={props.name}
                value={index + 1}
                tabIndex={0}
                onChange={handleChange}
              />
              <div className={namespace('likert__label-outer')}>
                <label
                  htmlFor={option.id}
                  className={namespace('likert__button')}>
                  {/* only 0 index a scale if it's length is more than 10 */}
                  {scale.length > 10 ? index : index + 1}
                </label>
                {option.label &&
                  (index === 0 ||
                    index === scale.length - 1 ||
                    (scale.length % 2 &&
                      index === Math.floor(scale.length / 2)) ||
                    scale.length <= 5) && (
                    <span className={namespace('likert__label')}>
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

Likert.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string }))
    .isRequired,
  name: PropTypes.string,
  modifiers: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func
};

Likert.defaultProps = {
  options: [
    { label: 'Unlikely' },
    {},
    { label: 'Neutral' },
    {},
    { label: 'Likely' }
  ],
  onChange: () => {}
};
