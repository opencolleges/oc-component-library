import PropTypes from 'prop-types';
import React from 'react';

import * as _ from 'lodash';

import find from '../utilities/ts/find';

import NAMESPACE from '../utilities/ts/constants';

import namespace from '../utilities/ts/namespace';

import Icon from '../icon';

export default class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked
    };

    this.id = props.id ? props.id : _.uniqueId(`${NAMESPACE}-`);
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

    let classNames = namespace('checkbox');

    props.modifiers && (classNames += ` ${namespace(props.modifiers)}`);
    props.className && (classNames += ` ${props.className}`);

    return (
      <div className={classNames} style={props.style}>
        <input
          id={id}
          className={namespace('checkbox__input')}
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
        <label htmlFor={id} className={namespace('checkbox__label')}>
          {props.children}
        </label>
        {!props.readOnly && !props.disabled && (
          <svg
            className={namespace('checkbox__border-outer')}
            viewBox="0 0 16 16">
            <rect
              className={namespace('checkbox__border')}
              x="0.5"
              y="0.5"
              width="15"
              height="15"
              rx="1.5"
            />
          </svg>
        )}
        {!find('checkbox--right', props.modifiers) && (
          <Icon
            modifiers={`icon--close ${
              find('checkbox--error', props.modifiers) ? 'active' : ''
            }`}
          />
        )}
        {!find('checkbox--right', props.modifiers) && (
          <Icon
            modifiers={`icon--tick ${
              find('checkbox--success', props.modifiers) ? 'active' : ''
            }`}
          />
        )}
        <Icon modifiers={`icon--tick ${state.checked ? 'active' : ''}`} />
      </div>
    );
  }
}

Checkbox.propTypes = {
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

Checkbox.defaultProps = {
  onChange: () => {}
};
