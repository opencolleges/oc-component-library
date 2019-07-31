// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import find from '../utilities/js/find';
import namespace from '../utilities/js/namespace';

// * child imports
import Icon from '../icon';

// * React component
export default class Progress extends React.Component {
  constructor(props) {
    super(props);

    this.previousProgress = props.progress;

    this.state = {
      progress: props.progress,
      error: find('progress--error', this.props.modifiers),
      success: false
    };
  }

  componentDidUpdate(previousProps) {
    if (this.props.progress !== previousProps.progress) {
      this.previousProgress = previousProps.progress;

      this.setState({ progress: this.props.progress }, function() {
        this.state.progress === this.props.totalProgress &&
        !find('progress--alt', this.props.modifiers)
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

    let classNames = namespace('progress');

    props.modifiers && (classNames += ` ${namespace(props.modifiers)}`);

    state.success &&
      !find('progress--alt', props.modifiers) &&
      (classNames += ` ${namespace('progress--success')}`);

    props.className && (classNames += ` ${props.className}`);

    let width = `${(state.progress / props.totalProgress) * 100}%`;

    return (
      <div className={classNames} style={props.style}>
        <div className={namespace('progress__bar-outer')}>
          <div
            className={namespace('progress__bar')}
            style={{
              width: width
            }}
          />
        </div>
        <div className={namespace('progress__label')}>
          {props.message
            ? props.message
            : !find('progress--alt', props.modifiers)
            ? `${state.progress}%`
            : `${state.progress} of ${props.totalProgress}`}
        </div>
        {!find('progress--alt', props.modifiers) && (
          <Icon modifiers={`icon--close-ring ${state.error ? 'active' : ''}`} />
        )}
        {!find('progress--alt', props.modifiers) && (
          <Icon
            modifiers={`icon--tick-ring ${state.success ? 'active' : ''}`}
          />
        )}
      </div>
    );
  }
}

Progress.propTypes = {
  progress: PropTypes.number.isRequired,
  totalProgress: PropTypes.number.isRequired,
  message: PropTypes.string,
  modifiers: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
};

Progress.defaultProps = {
  totalProgress: 100
};
