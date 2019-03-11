// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import find from '../utils/find';
import getId from '../utils/getId';
import prefix from '../utils/prefix';

// * child imports
import OCIcon from '../icon';

// * React component
export default class OCCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.checked,
      error: find('checkbox--error', this.props.modifiers),
      success: find('checkbox--success', this.props.modifiers),
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

    // this.props.onChange(this.props.name, this.props.value);
  };

  render() {
    const { props, state, id, handleChange } = this;

    return (
      <div
        className={
          !props.modifiers
            ? prefix('checkbox')
            : `${prefix(`checkbox ${props.modifiers}`)}`
        }>
        <input
          id={id}
          className={prefix('checkbox__input')}
          type="checkbox"
          name={props.name}
          value={props.value}
          disabled={state.disabled}
          readOnly={props.readOnly}
          required={props.required}
          defaultChecked={state.checked}
          tabIndex={!props.readOnly && !state.disabled ? 0 : -1}
          onChange={handleChange}
        />
        <label htmlFor={id} className={prefix('checkbox__label')}>
          {props.label}
        </label>
        {!props.readOnly && !state.disabled && (
          <svg className={prefix('checkbox__border-outer')} viewBox="0 0 16 16">
            <rect
              className={prefix('checkbox__border')}
              x="0.5"
              y="0.5"
              width="15"
              height="15"
              rx="1.5"
            />
          </svg>
        )}
        {!find('checkbox--right', props.modifiers) && (
          <OCIcon modifiers={`icon--close ${state.error ? 'active' : ''}`} />
        )}
        {!find('checkbox--right', props.modifiers) && (
          <OCIcon modifiers={`icon--tick ${state.success ? 'active' : ''}`} />
        )}
        <OCIcon modifiers={`icon--tick ${state.checked ? 'active' : ''}`} />
      </div>
    );
  }
}

OCCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  id: PropTypes.string,
  modifiers: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  onChange: PropTypes.func
};
