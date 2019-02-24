import PropTypes from 'prop-types';
import React from 'react';

import OCGrid from '../grid';
import OCGridItem from '../grid-item';
import OCRadio from '../radio';

class OCRadioSet extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { props } = this;

    return (
      <OCGrid modifiers="grid--gutter-x-fixed">
        <OCGridItem modifiers="grid__item--s-12">{props.label}</OCGridItem>
        {props.radios.map((radio, index) => (
          <OCGridItem modifiers="grid__item--s-12 grid__item--m-6 grid__item--align-end">
            <OCRadio
              key={index}
              defaultChecked={
                props.required && index === 0 ? true : radio.checked
              }
              {...props}
            />
          </OCGridItem>
        ))}
      </OCGrid>
    );
  }
}

OCRadioSet.propTypes = {
  label: PropTypes.string.isRequired,
  radios: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ).isRequired,
  required: PropTypes.bool
};

export default OCRadioSet;
