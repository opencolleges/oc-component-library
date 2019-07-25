// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utilities/js/prefix';
import getId from '../utilities/js/getId';

// * React component
export default class OCRange extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value
        ? this.props.value
        : (Number(this.props.max) - Number(this.props.min)) / 2 +
          Number(this.props.min)
    };

    this.id = this.props.id ? this.props.id : getId();
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      this.setState({
        value: this.props.value
      });
    }
  }

  handleChange = e => {
    this.setState({ value: e.target.value });

    this.props.onChange(e);
  };

  render() {
    const { props, state, id, handleChange } = this;

    let classNames = prefix('range');

    props.className && (classNames += ` ${props.className}`);

    return (
      <div className={classNames} style={props.style}>
        <input
          id={id}
          className={prefix('range__input')}
          type="range"
          name={props.name}
          value={state.value}
          min={props.min}
          max={props.max}
          onChange={handleChange}
        />
        <label htmlFor={id} className={prefix('range__label')}>
          {props.label}
        </label>
        <div
          className={prefix('range__track')}
          style={{
            width: `${((state.value - props.min) /
              (Number(props.max) - Number(props.min))) *
              100}%`
          }}
          aria-hidden="true"
        />
        <div
          className={prefix('range__thumb')}
          style={{
            left: `${((state.value - props.min) /
              (Number(props.max) - Number(props.min))) *
              100}%`,
            transform: `translateX(-${((state.value - props.min) /
              (Number(props.max) - Number(props.min))) *
              100}%)`
          }}
          aria-hidden="true"
        />
        <span className={prefix('range__value')}>{state.value}</span>
      </div>
    );
  }
}

OCRange.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  style: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func
};

OCRange.defaultProps = {
  min: 0,
  max: 100,
  onChange: () => {}
};
