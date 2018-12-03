import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { prefix, uniqueId, find, remove } from '../utilities';

import OCIcon from '../icon';

class OCCheckbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: uniqueId(),
      checked: find('checkbox--checked', this.props.modifiers),
      disabled: find('checkbox--disabled', this.props.modifiers),
      readOnly: find('checkbox--read-only', this.props.modifiers)
    };
  }

  componentDidUpdate(previousProps) {
    if (this.props.modifiers !== previousProps.modifiers) {
      this.setState({
        disabled: find('checkbox--disabled', this.props.modifiers),
        readOnly: find('checkbox--read-only', this.props.modifiers)
      });
    }
  }

  handleChange = () => {
    this.setState({ checked: !this.state.checked });
  };

  render() {
    const { props, state, handleChange } = this;
    const modifiers = remove(
      ['checkbox--checked', 'checkbox--disabled', 'checkbox--read-only'],
      props.modifiers
    );

    return (
      <div
        className={
          !modifiers ? prefix('checkbox') : `${prefix(`checkbox ${modifiers}`)}`
        }>
        <input
          id={state.id}
          className={prefix('checkbox__input')}
          type="checkbox"
          name={props.name}
          disabled={state.disabled}
          readOnly={state.readOnly}
          defaultChecked={state.checked}
          tabIndex={state.readOnly ? -1 : null}
          onChange={props.onChange ? props.onChange : handleChange}
        />
        <label htmlFor={state.id} className={prefix('checkbox__label')}>
          {props.label}
        </label>
        {!state.disabled && !state.readOnly && (
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
        <OCIcon modifiers={'icon--tick active'} />
      </div>
    );
  }
}

OCCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  modifiers: PropTypes.string,
  onChange: PropTypes.func
};

OCCheckbox.defaultProps = {
  modifiers: 'checkbox--left'
};

export default OCCheckbox;
