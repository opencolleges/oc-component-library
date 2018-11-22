import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { prefix, uniqueId, find, remove } from '../utilities';

class OCToggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: uniqueId(),
      checked: find('toggle--checked', this.props.modifiers),
      disabled: find('toggle--disabled', this.props.modifiers)
    };
  }

  componentDidUpdate(previousProps) {
    if (this.props.modifiers !== previousProps.modifiers) {
      this.setState({
        disabled: find('toggle--disabled', this.props.modifiers)
      });
    }
  }

  handleChange = () => {
    this.setState({ checked: !this.state.checked });
  };

  render() {
    const { props, state, handleChange } = this;
    const modifiers = remove(
      ['toggle--checked', 'toggle--disabled'],
      props.modifiers
    );

    return (
      <div
        className={
          !modifiers ? prefix('toggle') : `${prefix(`toggle ${modifiers}`)}`
        }>
        <input
          id={state.id}
          className={prefix('toggle__input')}
          name={props.name}
          type="checkbox"
          disabled={state.disabled}
          defaultChecked={state.checked}
          onChange={handleChange}
        />
        <label htmlFor={state.id} className={prefix('toggle__label')}>
          {props.label}
        </label>
        {!state.disabled && (
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
  modifiers: PropTypes.string
};

OCToggle.defaultProps = {
  modifiers: 'toggle--left'
};

export default OCToggle;
