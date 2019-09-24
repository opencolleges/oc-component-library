import * as React from 'react';

import { Props, State } from './progress.interface';

import namespace from '../utilities/ts/namespace';
import toModifier from '../utilities/ts/to-modifier';

import Icon from '../icon';

import * as _ from 'lodash';

export default class Progress extends React.Component<Props> {
  static defaultProps: Partial<Props> = {
    totalProgress: 100
  };

  readonly state: Readonly<State> = {
    error: _.includes(_.split(this.props.modifiers, ' '), 'error'),
    success: false
  };

  componentDidUpdate(prevProps): void {
    if (
      this.props.progress !== prevProps.progress &&
      this.props.progress === this.props.totalProgress &&
      !_.includes(_.split(this.props.modifiers, ' '), 'alt')
    ) {
      this.setState({ success: true });
    }

    if (this.props.modifiers !== prevProps.modifiers) {
      this.setState({
        error: _.includes(_.split(this.props.modifiers, ' '), 'error')
      });
    }
  }

  render() {
    const { props, state } = this;
    const classNames: string = _.trim(
      `${namespace(
        'progress',
        toModifier(props.modifiers, 'progress'),
        `${
          state.success && !_.includes(_.split(props.modifiers, ' '), 'alt')
            ? toModifier('success', 'progress')
            : ''
        }`
      )} ${_.toString(props.className)}`
    );
    const width: string = `${(props.progress / props.totalProgress) * 100}%`;

    return (
      <div className={classNames} style={props.style}>
        <div className={namespace('progress__bar-outer')}>
          <div
            className={namespace('progress__bar')}
            style={{
              width
            }}
          />
        </div>
        <div className={namespace('progress__label')}>
          {props.message
            ? props.message
            : !_.includes(_.split(props.modifiers, ' '), 'alt')
            ? `${props.progress}%`
            : `${props.progress} of ${props.totalProgress}`}
        </div>
        {!_.includes(_.split(props.modifiers, ' '), 'alt') && (
          <React.Fragment>
            <Icon
              type="close-ring"
              visible={state.error ? state.error : false}
            />
            <Icon
              type="tick-ring"
              visible={state.success ? state.success : false}
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}
