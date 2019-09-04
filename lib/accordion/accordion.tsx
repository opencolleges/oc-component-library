import * as _ from 'lodash';
import * as React from 'react';

import namespace from '../utilities/js/namespace';

import IAccordionProps from './accordion.types';

import Icon from '../icon';

export default class Accordion extends React.Component<IAccordionProps> {
  constructor(props) {
    super(props);

    this.contentRef = React.createRef();

    this.state = {
      expanded: this.props.expanded,
      height: null
    };
  }

  public componentDidMount() {
    this.sniffHeight();

    window.addEventListener('resize', this.sniffHeight);
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.sniffHeight);
  }

  public sniffHeight = () => {
    this.setState(
      {
        height: null
      },
      function() {
        this.setState({
          height: this.contentRef.current.scrollHeight - 1
        });
      }
    );
  };

  public handleClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  public render() {
    const { contentRef, props, state, handleClick } = this;

    return (
      <div className={namespace(`accordion ${state.expanded ? 'active' : ''}`)}>
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

// Accordion.propTypes = {
//   expanded: PropTypes.bool,
//   label: PropTypes.string.isRequired,
//   children: PropTypes.node.isRequired
// };

Accordion.defaultProps = {
  expanded: false
};
