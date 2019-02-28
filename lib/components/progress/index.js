// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * sibling imports
import OCIcon from '../icon';

// * utility imports
import find from '../utils/find';
import prefix from '../utils/prefix';

import CountUp from 'react-countup';

// * React component
class OCProgress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: props.progress,
      error: find('progress--error', this.props.modifiers),
      success: find('progress--success', this.props.modifiers)
    };

    this.previousProgress = props.progress;
  }

  componentDidUpdate(previousProps) {
    if (this.props.progress !== previousProps.progress) {
      this.previousProgress = previousProps.progress;

      this.setState({ progress: this.props.progress });
    }

    if (this.props.modifiers !== previousProps.modifiers) {
      this.setState({
        error: find('progress--error', this.props.modifiers),
        success: find('progress--success', this.props.modifiers)
      });
    }
  }

  render() {
    const { props, state, previousProgress } = this;

    return (
      <div
        className={
          !props.modifiers
            ? prefix('progress')
            : `${prefix(`progress ${props.modifiers}`)}`
        }>
        <div className={prefix('progress__label')}>
          <CountUp
            start={previousProgress}
            end={state.progress}
            duration={0.5}
          />
          %
        </div>
        <div className={prefix('progress__bar-outer')}>
          <div
            className={prefix('progress__bar')}
            style={{ width: `${state.progress}%` }}
          />
        </div>
        <OCIcon modifiers={`icon--close-ring ${state.error ? 'active' : ''}`} />
        <OCIcon
          modifiers={`icon--tick-ring ${state.success ? 'active' : ''}`}
        />
      </div>
    );
  }
}

OCProgress.protoTypes = {
  progress: PropTypes.number.isRequired,
  modifiers: PropTypes.oneOf(['progress--error', 'progress--success'])
};

OCProgress.defaultProps = {
  progress: 0
};

export default OCProgress;
