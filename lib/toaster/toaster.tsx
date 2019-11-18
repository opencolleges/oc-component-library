import React from 'react';
import { IconTypes } from '../icon';
import Toast from '../toast';
import BEM, { BEMInterface } from '../utilities/ts/bem';
import addId from './utilities/add-id';

type ModifiersTypes = `error` | `success`;

export interface ToastProps {
  className?: string;
  duration?: number;
  heading: string;
  icon?: IconTypes;
  id?: string;
  message: string;
  modifiers?: ModifiersTypes;
  onClick?: (id: string) => void;
  style?: React.CSSProperties;
}

interface Props {
  className?: string;
  style?: React.CSSProperties;
  toasts?: ToastProps[];
}

interface State {
  toasts: ToastProps[];
}

interface RenderInterface {
  handleClick: (id: string) => void;
  props: Props;
  state: State;
}

class Toaster extends React.Component<Props, State> {
  static defaultProps: Partial<Props> = {
    toasts: []
  };

  readonly state: Readonly<State> = {
    toasts: addId(this.props.toasts)
  };

  componentDidUpdate(prevProps: Props): void {
    if (prevProps !== this.props) {
      this.setState({
        toasts: [...this.state.toasts, ...addId(this.props.toasts)]
      });
    }
  }

  handleClick = (id: string): void => {
    const toasts: ToastProps[] = [...this.state.toasts];

    for (let i: number = 0; i < toasts.length; i++) {
      if (toasts[i].id === id) {
        toasts.splice(i, 1);
      }
    }

    this.setState({ toasts });
  };

  render() {
    const { props, state, handleClick }: RenderInterface = this;

    const BEM_MODULE: BEMInterface = BEM(`toaster`);
    const { addClassNames, getResult }: BEMInterface = BEM_MODULE;

    addClassNames(props.className);

    return (
      <div className={getResult()} style={props.style}>
        {state.toasts.map(toast => (
          <Toast key={toast.id} {...toast} onClick={handleClick} />
        ))}
      </div>
    );
  }
}

export { Toaster as default };
