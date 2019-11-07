import React from 'react';

import Icon from '../icon';

import BEM from '../utilities/ts/bem';

interface Props {
  children: React.ReactNode;
  className?: string;
  label: string;
  modifiers?: string;
  open?: boolean;
  style?: React.CSSProperties;
}

interface State {
  height?: number;
  open?: boolean;
}

export default class Accordion extends React.Component<Props, State> {
  static defaultProps: Partial<Props> = {
    open: false
  };

  readonly state: Readonly<State> = {
    height: null,
    open: this.props.open
  };

  contentRef = React.createRef<HTMLDivElement>();

  componentDidMount(): void {
    this.setContentHeight();

    window.addEventListener(`resize`, this.setContentHeight);
  }

  componentWillUnmount(): void {
    window.removeEventListener(`resize`, this.setContentHeight);
  }

  setContentHeight = (): void => {
    this.setState({ height: null }, () => {
      this.setState({ height: this.contentRef.current.scrollHeight - 1 });
    });
  };

  handleClick = (): void => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { props, state, contentRef, handleClick } = this;

    const bem = BEM(`accordion`);
    bem.addModifiers(props.modifiers);
    bem.addClassNames(state.open ? `active` : ``);
    bem.addClassNames(props.className);

    return (
      <div className={bem.getResult()} style={props.style}>
        <button
          type={`button`}
          className={bem.getElement(`button`)}
          title={state.open ? `Close` : `Open`}
          onClick={handleClick}>
          {props.label}
        </button>
        <Icon type="minus" />
        <Icon type="plus" visible={!state.open} />
        <div
          ref={contentRef}
          className={bem.getElement(`outer`)}
          style={{ height: state.open ? state.height : 0 }}>
          {props.children}
        </div>
        <div className={bem.getElement(`border`)} />
      </div>
    );
  }
}
