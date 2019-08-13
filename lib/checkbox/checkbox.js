// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import find from '../utilities/js/find';
import getId from '../utilities/js/getId';
import prefix from '../utilities/js/prefix';

// * child imports
import OCIcon from '../icon';

// * React component
export default class OCCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked
    };

    this.id = props.id ? props.id : getId();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.checked !== this.props.checked) {
      this.setState({ checked: this.props.checked });
    }
  }

  handleChange = () => {
    this.setState({ checked: !this.state.checked }, () => {
      this.props.onChange(
        this.props.value,
        this.props.name,
        this.state.checked
      );
    });
  };

  render() {
    const { props, state, id, handleChange } = this;

    let classNames = prefix('checkbox');

    props.modifiers && (classNames += ` ${prefix(props.modifiers)}`);
    props.className && (classNames += ` ${props.className}`);

    return (
      <div className={classNames} style={props.style}>
        <input
          id={id}
          className={prefix('checkbox__input')}
          type="checkbox"
          name={props.name}
          value={props.value}
          disabled={props.disabled}
          readOnly={props.readOnly}
          required={props.required}
          defaultChecked={state.checked}
          tabIndex={!props.readOnly && !props.disabled ? 0 : -1}
          onChange={handleChange}
        />
        <label htmlFor={id} className={prefix('checkbox__label')}>
          {props.children}
        </label>
        {!props.readOnly && !props.disabled && (
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
          <OCIcon
            modifiers={`icon--close ${
              find('checkbox--error', props.modifiers) ? 'active' : ''
            }`}
          />
        )}
        {!find('checkbox--right', props.modifiers) && (
          <OCIcon
            modifiers={`icon--tick ${
              find('checkbox--success', props.modifiers) ? 'active' : ''
            }`}
          />
        )}
        <OCIcon modifiers={`icon--tick ${state.checked ? 'active' : ''}`} />
      </div>
    );
  }
}

OCCheckbox.propTypes = {
  children: PropTypes.node.isRequired,
  modifiers: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  id: PropTypes.string,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func
};

OCCheckbox.defaultProps = {
  onChange: () => {}
};
