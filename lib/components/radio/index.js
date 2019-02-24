import PropTypes from 'prop-types';
import React from 'react';

import { prefix, uniqueId } from '../utilities';

class OCRadio extends React.Component {
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

    // this.props.onChange(this.props.name, this.props.value);
  };

  render() {
    const { props, state, id, handleChange } = this;

    return (
      <div
        className={
          !props.modifiers
            ? prefix('radio')
            : `${prefix(`radio ${props.modifiers}`)}`
        }>
        <input
          id={id}
          className={prefix('radio__input')}
          type="radio"
          name={props.name}
          value={props.value}
          disabled={state.disabled}
          readOnly={props.readOnly}
          defaultChecked={state.checked}
          tabIndex={!props.readOnly && !state.disabled ? 0 : null}
          onChange={handleChange}
        />
        <label htmlFor={id} className={prefix('radio__label')}>
          {props.label}
        </label>
        {!props.readOnly && !state.disabled && (
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
  value: PropTypes.string.isRequired,
  id: PropTypes.string,
  modifiers: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func
};

OCRadio.defaultProps = {
  modifiers: 'radio--left'
};

export default OCRadio;
