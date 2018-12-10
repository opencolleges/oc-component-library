import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Fieldset from '../fieldset/index';
import Radio from '../radio/index';

class OCRadioSet extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      label,
      name,
      modifiers,
      radioModifiers,
      options,
      onHandleChange,
      readOnly
    } = this.props;

    return (
      <Fieldset
        modifiers="grid__item--s-12 grid__item--m-4 grid__item--align-end"
        name={label}>
        {options.map((option, index) => (
          <div key={index}>
            <Radio
              label={option.label}
              value={option.value}
              name={name}
              radioModifiers={radioModifiers}
              onChange={onHandleChange}
              readOnly={readOnly}
            />
          </div>
        ))}
      </Fieldset>
    );
  }
}

OCRadioSet.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ).isRequired,
  modifiers: PropTypes.string,
  onHandleChange: PropTypes.func,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  radioModifiers: PropTypes.string
};

OCRadioSet.defaultProps = {
  label: 'sample label',
  name: '12344',
  options: [
    {
      label: '1',
      value: '1'
    },
    {
      label: '2',
      value: '2'
    }
  ],
  onHandleChange: function(name, value) {
    console.log(name + '====' + value);
  },
  required: false,
  readOnly: false
};

export default OCRadioSet;
