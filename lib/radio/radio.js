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
export default class OCRadio extends React.Component {
  constructor(props) {
    super(props);

    this.id = props.id ? props.id : getId();
  }

  handleChange = () => {
    this.props.onChange(this.props.value, this.props.name);
  };

  render() {
    const { props, id, handleChange } = this;

    let classNames = prefix('radio');

    props.modifiers && (classNames += ` ${prefix(props.modifiers)}`);
    props.className && (classNames += ` ${props.className}`);

    return (
      <div className={classNames} style={props.style}>
        <input
          id={id}
          className={prefix('radio__input')}
          type="radio"
          name={props.name}
          value={props.value}
          disabled={props.disabled}
          readOnly={props.readOnly}
          required={props.required}
          defaultChecked={props.checked}
          tabIndex={!props.readOnly && !props.disabled ? 0 : -1}
          onChange={handleChange}
        />
        <label htmlFor={id} className={prefix('radio__label')}>
          {props.children}
        </label>
        {!props.readOnly && !props.disabled && (
          <svg className={prefix('radio__border-outer')} viewBox="0 0 16 16">
            <circle className={prefix('radio__border')} cx={8} cy={8} r={7.5} />
          </svg>
        )}
        {!find('radio--right', props.modifiers) && (
          <OCIcon
            modifiers={`icon--close ${
              find('radio--error', props.modifiers) ? 'active' : ''
            }`}
          />
        )}
        {!find('radio--right', props.modifiers) && (
          <OCIcon
            modifiers={`icon--tick ${
              find('radio--success', props.modifiers) ? 'active' : ''
            }`}
          />
        )}
      </div>
    );
  }
}

OCRadio.propTypes = {
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

OCRadio.defaultProps = {
  onChange: () => {}
};
