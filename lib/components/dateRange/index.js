import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../utilities';
import { now, oneDayAhead } from '../date/utilities';

import OCDate from '../date';
import OCIcon from '../icon';

class OCDateRange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: ''
    };
  }

  render() {
    const { props } = this;

    return (
      <div className={prefix('date-range')}>
        <OCDate
          label="Start date"
          selection={props.selection ? props.selection : ''}
        />
        <OCIcon modifiers="icon--chevron-right" />
        <OCDate
          label="End date"
          selection={props.selection ? oneDayAhead(props.selection) : ''}
        />
        <div className={prefix('date-range__border')} />
      </div>
    );
  }
}

OCDateRange.propTypes = {
  selection: PropTypes.string,
  name: PropTypes.string
};

export default OCDateRange;
