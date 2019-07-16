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
      value: this.props.value ? this.props.value : 0
    };

    this.id = this.props.id ? this.props.id : getId();
  }

  handleChange = e => {
    this.setState({ value: e.target.value });
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
          onChange={handleChange}
        />
        <label htmlFor={id} className={prefix('range__label')}>
          {props.label}
        </label>
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
  value: PropTypes.string
};
