// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utils/prefix';

// * React component
class OCTableRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { props } = this;

    return (
      <tr
        className={
          !props.modifiers ? prefix('tr') : prefix(`tr ${props.modifiers}`)
        }>
        {props.children}
      </tr>
    );
  }
}

OCTableRow.propTypes = {
  children: PropTypes.node.isRequired,
  modifiers: PropTypes.oneOf(['tr--left', 'tr--center', 'tr--right'])
};

export default OCTableRow;
