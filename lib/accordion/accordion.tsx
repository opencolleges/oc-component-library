import React from 'react';

import Icon from '../icon';

import { Props, State } from './accordion.interface';

import BEM from '../utilities/ts/bem';

export default class Accordion extends React.Component<Props, State> {
  static defaultProps: Partial<Props> = {
    expanded: false
  };

  readonly state: Readonly<State> = {
    expanded: this.props.expanded,
    height: null
  };

  contentRef = React.createRef<HTMLDivElement>();

  componentDidMount(): void {
    this.setContentHeight();

    window.addEventListener('resize', this.setContentHeight);
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this.setContentHeight);
  }

  setContentHeight = (): void => {
    this.setState({ height: null }, () => {
      this.setState({ height: this.contentRef.current.scrollHeight - 1 });
    });
  };

  handleClick = (): void => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { props, state, contentRef, handleClick } = this;

    const bem = BEM('accordion');
    bem.addModifiers(props.modifiers);
    bem.addClassNames(state.expanded ? 'active' : '');
    bem.addClassNames(props.className);

    return (
      <div className={bem.getResult()} style={props.style}>
        <button
          type={'button'}
          className={bem.getElement('button')}
          title={state.expanded ? 'Contract' : 'Expand'}
          onClick={handleClick}>
          {props.label}
        </button>
        <Icon type="minus" />
        <Icon type="plus" visible={!state.expanded} />
        <div
          ref={contentRef}
          className={bem.getElement('outer')}
          style={{ height: state.expanded ? state.height : 0 }}>
          {props.children}
        </div>
        <div className={bem.getElement('border')} />
      </div>
    );
  }
}
