// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utils/prefix';

// * React component
class OCTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { props } = this;

    return (
      <table
        className={
          !props.modifiers
            ? prefix('table')
            : `${prefix(`table ${props.modifiers}`)}`
        }>
        {props.children}
      </table>
    );
  }
}

OCTable.propTypes = {
  children: PropTypes.node.isRequired,
  modifiers: PropTypes.string
};

export default OCTable;
