import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { prefix, uniqueId } from '../utilities';

class OCToggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.checked,
      disabled: this.props.disabled
    };

    this.id = props.id ? props.id : uniqueId();
  }

  componentDidUpdate(previousProps) {
    if (this.props.disabled !== previousProps.disabled) {
      this.setState({
        disabled: this.props.disabled
      });
    }
  }

  handleChange = () => {
    this.setState(previousState => ({
      checked: !previousState.checked
    }));
  };

  render() {
    const { props, state, id, handleChange } = this;

    return (
      <div
        className={
          !props.modifiers
            ? prefix('toggle')
            : `${prefix(`toggle ${props.modifiers}`)}`
        }>
        <input
          id={id}
          className={prefix('toggle__input')}
          name={props.name}
          type="checkbox"
          disabled={state.disabled}
          readOnly={props.readOnly}
          defaultChecked={state.checked}
          tabIndex={props.readOnly ? -1 : null}
          onChange={props.onChange ? props.onChange : handleChange}
        />
        <label htmlFor={id} className={prefix('toggle__label')}>
          {props.label}
        </label>
        {!props.readOnly && !state.disabled && (
          <svg className={prefix('toggle__border-outer')} viewBox="0 0 40 24">
            <rect
              className={prefix('toggle__border')}
              x="0.5"
              y="0.5"
              width="39"
              height="23"
              rx="11.5"
            />
          </svg>
        )}
      </div>
    );
  }
}

OCToggle.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  modifiers: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func
};

OCToggle.defaultProps = {
  modifiers: 'toggle--left',
  checked: false,
  disabled: false,
  readOnly: false
};

export default OCToggle;
