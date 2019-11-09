import _ from 'lodash';
import React from 'react';

import Icon from '../icon';

import BEM from '../utilities/ts/bem';
import isNotAlt from './utilities/is-not-alt';

interface Props {
  className?: string;
  message?: string;
  modifiers?: string;
  progress: number;
  style?: React.CSSProperties;
  totalProgress?: number;
}

interface State {
  error: boolean;
  success: boolean;
}

class Progress extends React.Component<Props> {
  static defaultProps: Partial<Props> = {
    totalProgress: 100
  };

  readonly state: Readonly<State> = {
    error: _.includes(_.split(this.props.modifiers, ` `), `error`),
    success: false
  };

  componentDidUpdate(prevProps): void {
    if (
      this.props.progress !== prevProps.progress &&
      this.props.progress === this.props.totalProgress &&
      !_.includes(_.split(this.props.modifiers, ` `), `alt`)
    ) {
      this.setState({ success: true });
    }

    if (this.props.modifiers !== prevProps.modifiers) {
      this.setState({
        error: _.includes(_.split(this.props.modifiers, ` `), `error`)
      });
    }
  }

  render() {
    const { props, state } = this;

    const bem = BEM(`progress`);
    bem.addModifiers(props.modifiers);
    bem.addModifiers(
      state.success && isNotAlt(props.modifiers) ? `success` : ``
    );
    bem.addClassNames(props.className);

    const width: string = `${(props.progress / props.totalProgress) * 100}%`;

    let label: string;

    if (props.message) {
      label = props.message;
    } else if (isNotAlt(props.modifiers)) {
      label = `${props.progress}%`;
    } else {
      label = `${props.progress} of ${props.totalProgress}`;
    }

    return (
      <div className={bem.getResult()} style={props.style}>
        <div className={bem.getElement(`bar-outer`)}>
          <div
            className={bem.getElement(`bar`)}
            style={{
              width
            }}
          />
        </div>
        <div className={bem.getElement(`label`)}>{label}</div>
        {isNotAlt(props.modifiers) && (
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

export { Progress as default };
