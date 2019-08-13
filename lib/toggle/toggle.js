import PropTypes from 'prop-types';
import React from 'react';

import * as _ from 'lodash';

import NAMESPACE from '../utilities/js/constants';

import namespace from '../utilities/js/namespace';

export default class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.checked,
      disabled: this.props.disabled
    };

    this.id = props.id ? props.id : _.uniqueId(`${NAMESPACE}-`);
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

    let classNames = namespace('toggle');

    props.modifiers && (classNames += ` ${namespace(props.modifiers)}`);
    props.className && (classNames += ` ${props.className}`);

    return (
      <div className={classNames} style={props.style}>
        <input
          id={id}
          className={namespace('toggle__input')}
          type="checkbox"
          name={props.name}
          value={props.value}
          disabled={state.disabled}
          readOnly={props.readOnly}
          defaultChecked={state.checked}
          tabIndex={!props.readOnly && !state.disabled ? 0 : -1}
          onChange={handleChange}
        />
        <label htmlFor={id} className={namespace('toggle__label')}>
          {props.children}
        </label>
        {!props.readOnly && !state.disabled && (
          <svg
            className={namespace('toggle__border-outer')}
            viewBox="0 0 40 24">
            <rect
              className={namespace('toggle__border')}
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

Toggle.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  id: PropTypes.string,
  modifiers: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func
};

Toggle.defaultProps = {
  checked: false,
  disabled: false,
  readOnly: false,
  onChange: () => {}
};
