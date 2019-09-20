import * as React from 'react';

import { Props, State } from './accordion.interface';

import Icon from '../icon';

import namespace from '../utilities/ts/namespace';
import toModifier from '../utilities/ts/to-modifier';

import * as _ from 'lodash';

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

    const classNames: string = _.trim(
      `${namespace(
        'accordion',
        toModifier(props.modifiers, 'accordion'),
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
        <Icon type="minus" />
        <Icon type="plus" visible={!state.expanded} />
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
