import React from 'react';
import Icon from '../icon';
import BEM, { BEMInterface } from '../utilities/ts/bem';
import includes from '../utilities/ts/includes';
import itemise from '../utilities/ts/itemise';
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

interface RenderInterface {
  props: Props;
  state: State;
}

class Progress extends React.Component<Props> {
  static defaultProps: Partial<Props> = {
    totalProgress: 100
  };

  readonly state: Readonly<State> = {
    error: includes(itemise(this.props.modifiers), `error`),
    success: false
  };

  componentDidUpdate(prevProps: Props): void {
    if (
      this.props.progress !== prevProps.progress &&
      this.props.progress === this.props.totalProgress &&
      !includes(itemise(this.props.modifiers), `alt`)
    ) {
      this.setState({ success: true });
    }

    if (this.props.modifiers !== prevProps.modifiers) {
      this.setState({
        error: includes(itemise(this.props.modifiers), `error`)
      });
    }
  }

  render() {
    const { props, state }: RenderInterface = this;

    const BEM_MODULE: BEMInterface = BEM(`progress`);
    const {
      addClassNames,
      addModifiers,
      getElement,
      getResult
    }: BEMInterface = BEM_MODULE;

    addModifiers(props.modifiers);
    addModifiers(!!state.success && isNotAlt(props.modifiers) ? `success` : ``);
    addClassNames(props.className);

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
      <div className={getResult()} style={props.style}>
        <div className={getElement(`bar-outer`)}>
          <div className={getElement(`bar`)} style={{ width }} />
        </div>
        <div className={getElement(`label`)}>{label}</div>
        {isNotAlt(props.modifiers) && (
          <React.Fragment>
            <Icon
              type="close-ring"
              visible={!!state.error ? state.error : false}
            />
            <Icon
              type="tick-ring"
              visible={!!state.success ? state.success : false}
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}

export { Progress as default };
