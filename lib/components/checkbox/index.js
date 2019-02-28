// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * sibling imports
import OCIcon from '../icon';

// * utility imports
import prefix from '../utils/prefix';
import getId from '../utils/getId';

// * React component
class OCCheckbox extends React.Component {
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
          defaultChecked={state.checked}
          tabIndex={!props.readOnly && !state.disabled ? 0 : null}
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
        {state.checked ? (
          <OCIcon modifiers={'icon--tick active'} />
        ) : (
          <OCIcon modifiers={'icon--tick'} />
        )}
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
  onChange: PropTypes.func
};

OCCheckbox.defaultProps = {
  modifiers: 'checkbox--left'
};

export default OCCheckbox;
