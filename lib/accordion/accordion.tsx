import React from 'react';
import Icon from '../icon';
import BEM, { BEMInterface } from '../utilities/ts/bem';
import pxToRem from '../utilities/ts/px-to-rem';

interface Props {
  children: React.ReactNode;
  className?: string;
  label: string;
  modifiers?: string;
  open?: boolean;
  style?: React.CSSProperties;
}

interface State {
  height: string;
  open: boolean;
}

class Accordion extends React.Component<Props, State> {
  static defaultProps: Partial<Props> = {
    open: false
  };

  readonly state: Readonly<State> = {
    height: null,
    open: this.props.open
  };

  accordionOuterRef = React.createRef<HTMLDivElement>();

  componentDidMount(): void {
    this.setAccordionHeight();

    window.addEventListener(`resize`, this.setAccordionHeight);
  }

  componentWillUnmount(): void {
    window.removeEventListener(`resize`, this.setAccordionHeight);
  }

  accordionToggle = (): void => {
    this.setState({ open: !this.state.open });
  };

  setAccordionHeight = (): void => {
    const height: string = `${pxToRem(
      this.accordionOuterRef.current.scrollHeight - 1
    )}rem`;

    this.setState({ height: null }, () => {
      this.setState({ height });
    });
  };

  render() {
    const { props, state, accordionOuterRef, accordionToggle } = this;

    const BEM_MODULE: BEMInterface = BEM(`accordion`);
    const {
      addClassNames,
      addModifiers,
      getElement,
      getResult
    }: BEMInterface = BEM_MODULE;

    addModifiers(props.modifiers);
    addClassNames(!!state.open ? `active` : ``);
    addClassNames(props.className);

    return (
      <div className={getResult()} style={props.style}>
        <button
          type={`button`}
          className={getElement(`button`)}
          title={!!state.open ? `Close` : `Open`}
          onClick={accordionToggle}>
          {props.label}
        </button>
        <Icon type="minus" />
        <Icon type="plus" visible={!state.open} />
        <div
          ref={accordionOuterRef}
          className={getElement(`outer`)}
          style={{ height: !!state.open ? state.height : 0 }}>
          {props.children}
        </div>
        <div className={getElement(`border`)} />
      </div>
    );
  }
}

export { Accordion as default };
