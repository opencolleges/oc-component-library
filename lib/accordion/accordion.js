// * React imports
import PropTypes from 'prop-types';
import React from 'react';

// * utility imports
import prefix from '../utilities/js/prefix';

// * child imports
import OCIcon from '../icon';

// * React component
export default class OCAccordion extends React.Component {
  constructor(props) {
    super(props);

    this.contentRef = React.createRef();

    this.state = {
      expanded: this.props.expanded,
      height: null
    };
  }

  componentDidMount() {
    this.sniffHeight();

    window.addEventListener('resize', this.sniffHeight);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.sniffHeight);
  }

  sniffHeight = () => {
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

  handleClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { contentRef, props, state, handleClick } = this;

    return (
      <div className={prefix(`accordion ${state.expanded ? 'active' : ''}`)}>
        <button
          type={'button'}
          className={prefix('accordion__button')}
          title={state.expanded ? 'Contract' : 'Expand'}
          onClick={handleClick}>
          {props.label}
        </button>
        <OCIcon modifiers={'icon--minus active'} />
        <OCIcon modifiers={`icon--plus ${state.expanded ? '' : 'active'}`} />
        <div
          ref={contentRef}
          className={prefix('accordion__outer')}
          style={{ height: state.expanded ? state.height : 0 }}>
          {props.children}
        </div>
        <div className={prefix('accordion__border')} />
      </div>
    );
  }
}

OCAccordion.propTypes = {
  expanded: PropTypes.bool,
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

OCAccordion.defaultProps = {
  expanded: false
};
