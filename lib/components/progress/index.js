import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../utilities';
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
    const { state } = this;

    //const statusClass
    return (
      <div className={prefix('progress')}>
        <div className={prefix('progress__label')}>{`${
          state.percentage
        }%`}</div>
        <div className={prefix('progress__bar-outer')}>
          <div className={prefix('progress__bar-inner')}>
            <div
              className={prefix(`progress__bar progress__bar--${state.status}`)}
              style={{ width: `${state.percentage}%` }}
            />
          </div>
        </div>
        <div
          className={prefix(`progress__icon progress__icon--${state.status}`)}>
          <OCIcon
            modifiers={`${
              state.status === 'error' ? 'icon--close-ring' : 'icon--tick-ring'
            }`}
          />
        </div>

        {/* <div className={prefix('progress__label')}>{`${state.percentage}%`}</div>
        <div className={prefix('progress__bar-outer')}>
          <div className={prefix('progress__bar-inner')}>
            <div
              className={prefix(`progress__bar progress__bar--${state.status}`)}
              style={{ width: `${state.percentage}%` }}
            />
          </div>
        </div>
        <div className={prefix(`progress__icon progress__icon--${state.status}`)}>
          <OCIcon
            modifiers={`${
              state.status === 'error' ? 'icon--close-ring' : 'icon--tick-ring'
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
