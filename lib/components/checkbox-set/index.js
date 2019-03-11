// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import find from '../utils/find';
import prefix from '../utils/prefix';
import randomise from '../utils/randomise';
import toTitleCase from '../utils/toTitleCase';

// * child imports
import OCGrid from '../grid';
import OCGridItem from '../grid-item';
import OCheckbox from '../checkbox';

// * React component
export default class OCCheckboxSet extends React.Component {
  render() {
    return null;
  }
}

OCCheckboxSet.propTypes = {
  checkboxes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  defaultSelection: PropTypes.string
};
