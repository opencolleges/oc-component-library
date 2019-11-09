import React from 'react';

import addId from './utilities/add-id';

import BEM from '../utilities/ts/bem';

import Toast from '../toast';

import { TIcon } from '../icon/icon';

export interface ToastProps {
  className?: string;
  duration?: number;
  heading: string;
  icon?: TIcon;
  id?: string;
  message: string;
  modifiers?: `error` | `success`;
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

export default class Toaster extends React.Component<Props, State> {
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
    // Create an additional instance of array, so that .splice() doesn't
    // directly mutate state.
    const toasts: ToastProps[] = [...this.state.toasts];

    for (let index = 0; index < toasts.length; index++) {
      if (toasts[index].id === id) {
        toasts.splice(index, 1);
      }
    }

    this.setState({ toasts });
  };

  render() {
    const { props, state, handleClick } = this;

    const bem = BEM(`toaster`);
    bem.addClassNames(props.className);

    return (
      <div className={bem.getResult()} style={props.style}>
        {state.toasts.map(toast => (
          <Toast key={toast.id} {...toast} onClick={handleClick} />
        ))}
      </div>
    );
  }
}
