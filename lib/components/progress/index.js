import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { prefix, pre } from '../utilities';
import OCIcon from '../icon';

class OCProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percentage: props.percentage,
      status: props.status
    };
  }

  componentWillReceiveProps(previous) {
    if (this.state.percentage !== previous.percentage) {
      this.setState({ percentage: previous.percentage });
    }
    if (this.state.status !== previous.status) {
      this.setState({ status: previous.status });
    }
  }

  render() {
    const { percentage, status } = this.state;
    //const statusClass
    return (
      <div className={prefix('progress')}>
        <div className={prefix('progress__lable')}>{`${percentage}%`}</div>
        <div className={prefix('progress__bar-outer')}>
          <div className={prefix('progress__bar-inner')}>
            <div
              className={prefix(`progress__bar progress__bar--${status}`)}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
        <div className={prefix(`progress__icon progress__icon--${status}`)}>
          <OCIcon
            className={'boom'}
            modifiers={`${
              status === 'error' ? 'icon--close-ring' : 'icon--tick-ring'
            }`}
          />
        </div>

        {/* <div className={prefix('progress__lable')}>{`${percentage}%`}</div>
        <div className={prefix('progress__bar-outer')}>
          <div className={prefix('progress__bar-inner')}>
            <div
              className={prefix(`progress__bar progress__bar--${status}`)}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
        <div className={prefix(`progress__icon progress__icon--${status}`)}>
          <OCIcon
            className={'boom'}
            modifiers={`${
              status === 'error' ? 'icon--close-ring' : 'icon--tick-ring'
            }`}
          />
        </div> */}
      </div>
    );
  }
}
OCProgress.protoTypes = {
  percentage: PropTypes.number.isRequired,
  status: PropTypes.oneOf(['inprogress', 'success', 'error'])
};
OCProgress.defaultProps = {
  percentage: 30,
  status: 'success'
};
export default OCProgress;
