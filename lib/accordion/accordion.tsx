import * as React from 'react';

import { Props, State } from './accordion.interface';

import Icon from '../icon';

import namespace from '../utilities/js/namespace';

import * as _ from 'lodash';

export default class Accordion extends React.Component<Props, State> {
  static defaultProps: { expanded: boolean };

  readonly state: Readonly<State> = {
    expanded: this.props.expanded,
    height: null
  };

  contentRef = React.createRef<HTMLDivElement>();

  componentDidMount(): void {
    this.getContentHeight();
    window.addEventListener('resize', this.getContentHeight);
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this.getContentHeight);
  }

  handleClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  getContentHeight = () => {
    this.setState({ height: null }, () => {
      this.setState({
        height: this.contentRef.current.scrollHeight - 1
      });
    });
  };

  render() {
    const { contentRef, props, state, handleClick } = this;

    const classNames: string = _.trim(
      `${namespace(
        'accordion',
        props.modifiers,
        state.expanded ? 'active' : ''
      )} ${_.toString(props.className)}`
    );

    return (
      <div className={classNames} style={props.style}>
        <button
          type={'button'}
          className={namespace('accordion__button')}
          title={state.expanded ? 'Contract' : 'Expand'}
          onClick={handleClick}>
          {props.label}
        </button>
        <Icon modifiers={'icon--minus active'} />
        <Icon modifiers={`icon--plus ${state.expanded ? '' : 'active'}`} />
        <div
          ref={contentRef}
          className={namespace('accordion__outer')}
          style={{ height: state.expanded ? state.height : 0 }}>
          {props.children}
        </div>
        <div className={namespace('accordion__border')} />
      </div>
    );
  }
}

Accordion.defaultProps = {
  expanded: false
};
