// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utils/prefix';
import getId from '../utils/getId';

// * React component
export default class OCToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.checked,
      disabled: this.props.disabled
    };

    this.id = props.id ? props.id : getId();
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

    // this.props.onChange(this.props.value, this.props.name);
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
          type="checkbox"
          name={props.name}
          value={props.value}
          disabled={state.disabled}
          readOnly={props.readOnly}
          defaultChecked={state.checked}
          tabIndex={!props.readOnly && !state.disabled ? 0 : -1}
          onChange={handleChange}
        />
        <label htmlFor={id} className={prefix('toggle__label')}>
          {props.children}
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
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  id: PropTypes.string,
  modifiers: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func
};

OCToggle.defaultProps = {
  checked: false,
  disabled: false,
  readOnly: false,
  onChange: () => {}
};
