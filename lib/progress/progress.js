// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import namespace from '../utilities/ts/namespace';
import toModifier from '../utilities/ts/to-modifier';

// * child imports
import Icon from '../icon';

import * as _ from 'lodash';

// * React component
export default class Progress extends React.Component {
  constructor(props) {
    super(props);

    this.previousProgress = props.progress;

    this.state = {
      progress: props.progress,
      error: _.includes(_.split(this.props.modifiers, ' '), 'progress--error'),
      success: false
    };
  }

  componentDidUpdate(previousProps) {
    if (this.props.progress !== previousProps.progress) {
      this.previousProgress = previousProps.progress;

      this.setState({ progress: this.props.progress }, function() {
        this.state.progress === this.props.totalProgress &&
        !_.includes(_.split(this.props.modifiers, ' '), 'progress--alt')
          ? this.setState({ success: true })
          : this.setState({ success: false });
      });
    }

    if (this.props.modifiers !== previousProps.modifiers) {
      this.setState({
        error: _.includes(_.split(this.props.modifiers, ' '), 'progress--error')
      });
    }
  }

  render() {
    const { props, state } = this;

    let classNames = namespace('progress');

    props.modifiers &&
      (classNames += ` ${namespace(toModifier(props.modifiers, 'progress'))}`);

    state.success &&
      !_.includes(_.split(props.modifiers, ' '), 'progress--alt') &&
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
            : !_.includes(_.split(props.modifiers, ' '), 'progress--alt')
            ? `${state.progress}%`
            : `${state.progress} of ${props.totalProgress}`}
        </div>
        {!_.includes(_.split(props.modifiers, ' '), 'progress--alt') && (
          <Icon type="close-ring" visible={state.error ? state.error : false} />
        )}
        {!_.includes(_.split(props.modifiers, ' '), 'progress--alt') && (
          <Icon
            type="tick-ring"
            visible={state.success ? state.success : false}
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
