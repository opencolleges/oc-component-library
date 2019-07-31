import PropTypes from 'prop-types';
import React from 'react';

import * as _ from 'lodash';

import NAMESPACE from '../utilities/js/constants';

import find from '../utilities/js/find';
import namespace from '../utilities/js/namespace';

import Icon from '../icon';

export default class Radio extends React.Component {
  constructor(props) {
    super(props);

    this.id = props.id ? props.id : _.uniqueId(`${NAMESPACE}-`);
  }

  handleChange = () => {
    this.props.onChange(this.props.value, this.props.name);
  };

  render() {
    const { props, id, handleChange } = this;

    let classNames = namespace('radio');

    props.modifiers && (classNames += ` ${namespace(props.modifiers)}`);
    props.className && (classNames += ` ${props.className}`);

    return (
      <div className={classNames} style={props.style}>
        <input
          id={id}
          className={namespace('radio__input')}
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
        <label htmlFor={id} className={namespace('radio__label')}>
          {props.children}
        </label>
        {!props.readOnly && !props.disabled && (
          <svg className={namespace('radio__border-outer')} viewBox="0 0 16 16">
            <circle
              className={namespace('radio__border')}
              cx={8}
              cy={8}
              r={7.5}
            />
          </svg>
        )}
        {!find('radio--right', props.modifiers) && (
          <Icon
            modifiers={`icon--close ${
              find('radio--error', props.modifiers) ? 'active' : ''
            }`}
          />
        )}
        {!find('radio--right', props.modifiers) && (
          <Icon
            modifiers={`icon--tick ${
              find('radio--success', props.modifiers) ? 'active' : ''
            }`}
          />
        )}
      </div>
    );
  }
}

Radio.propTypes = {
  children: PropTypes.node.isRequired,
  modifiers: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  id: PropTypes.string,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func
};

Radio.defaultProps = {
  onChange: () => {}
};
