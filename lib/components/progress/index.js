// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * sibling imports
import OCIcon from '../icon';

// * utility imports
import find from '../utils/find';
import prefix from '../utils/prefix';

// * React component
class OCProgress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: props.progress,
      error: find('progress--error', this.props.modifiers),
      success: false
    };

    this.previousProgress = props.progress;
  }

  componentDidUpdate(previousProps) {
    if (this.props.progress !== previousProps.progress) {
      this.previousProgress = previousProps.progress;

      this.setState({ progress: this.props.progress }, function() {
        this.state.progress === this.props.totalProgress
          ? this.setState({ success: true })
          : this.setState({ success: false });
      });
    }

    if (this.props.modifiers !== previousProps.modifiers) {
      this.setState({
        error: find('progress--error', this.props.modifiers)
      });
    }
  }

  render() {
    const { props, state } = this;

    let hooks = '';

    props.type === 'pageNumber' && (hooks += 'progress--alt ');
    state.success && (hooks += 'progress--success');

    return (
      <div
        className={
          !props.modifiers
            ? prefix(`progress ${hooks}`)
            : `${prefix(`progress ${hooks} ${props.modifiers}`)}`
        }>
        <div className={prefix('progress__bar-outer')}>
          <div
            className={prefix('progress__bar')}
            style={{
              width: `${(state.progress / props.totalProgress) * 100}%`
            }}
          />
        </div>
        <div className={prefix('progress__label')}>
          {props.type === 'percentage'
            ? `${state.progress}%`
            : `${state.progress} of ${props.totalProgress}`}
        </div>
        {props.type === 'percentage' && (
          <OCIcon
            modifiers={`icon--close-ring ${state.error ? 'active' : ''}`}
          />
        )}
        {props.type === 'percentage' && (
          <OCIcon
            modifiers={`icon--tick-ring ${state.success ? 'active' : ''}`}
          />
        )}
      </div>
    );
  }
}

OCProgress.protoTypes = {
  type: PropTypes.oneOf(['percentage'], ['pageNumber']),
  progress: PropTypes.PropTypes.number.isRequired,
  totalProgress: PropTypes.number,
  modifiers: PropTypes.oneOf(['progress--error'])
};

OCProgress.defaultProps = {
  type: 'percentage',
  totalProgress: 100
};

export default OCProgress;
