import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { prefix, uniqueId, find, remove } from '../utilities';

class OCRadio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: find('radio--checked', this.props.modifiers),
      disabled: find('radio--disabled', this.props.modifiers)
    };
  }

  componentDidUpdate(previousProps) {
    if (this.props.modifiers !== previousProps.modifiers) {
      this.setState({
        disabled: find('radio--disabled', this.props.modifiers)
      });
    }
  }

  handleChange = () => {
    this.setState({ checked: !this.state.checked });
  };

  render() {
    const { props, state, handleChange } = this;
    const modifiers = remove(
      ['radio--checked', 'radio--disabled', 'radio--read-only'],
      props.modifiers
    );

    return (
      <div
        className={
          !modifiers ? prefix('radio') : `${prefix(`radio ${modifiers}`)}`
        }>
        <input
          id={props.id ? props.id : uniqueId()}
          className={prefix('radio__input')}
          name={props.name}
          type="radio"
          disabled={state.disabled}
          readOnly={find('radio--read-only', this.props.modifiers)}
          defaultChecked={state.checked}
          tabIndex={state.readOnly ? -1 : null}
          onChange={props.onChange ? props.onChange : handleChange}
        />
        <label htmlFor={state.id} className={prefix('radio__label')}>
          {props.label}
        </label>
        {!state.disabled && !state.readOnly && (
          <svg className={prefix('radio__border-outer')} viewBox="0 0 16 16">
            <circle className={prefix('radio__border')} cx={8} cy={8} r={7.5} />
          </svg>
        )}
      </div>
    );
  }
}

OCRadio.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  modifiers: PropTypes.string,
  onChange: PropTypes.func
};

OCRadio.defaultProps = {
  modifiers: 'radio--left'
};

export default OCRadio;
