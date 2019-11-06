import _ from 'lodash';
import React from 'react';

import { NAMESPACE } from '../utilities/ts/constants';

import BEM from '../utilities/ts/bem';

import Toast from '../toast';

import { TIcon } from '../icon/icon';

interface ToastProps {
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
  toasts: ToastProps[];
}

interface State {
  toasts: ToastProps[];
}

export default class Toaster extends React.Component<Props, State> {
  readonly state: Readonly<State> = {
    toasts: this.props.toasts ? this.addId(this.props.toasts) : []
  };
  addId = (initialToasts: ToastProps[]): ToastProps[] => {
    const toasts: ToastProps[] = [...initialToasts];

    for (const toast of toasts) {
      if (!toast.id) {
        toast.id = _.uniqueId(`${NAMESPACE}-`);
      }
    }

    return toasts;
  };

  // ! FIX
  componentDidUpdate(prevProps: Props): void {
    // if (prevProps !== this.props) {
    //   this.setState({
    //     toasts: [...this.state.toasts, ...this.addId(this.props.toasts)]
    //   });
    // }
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
          <Toast
            key={toast.id}
            id={toast.id}
            modifiers={toast.modifiers}
            className={toast.className}
            style={toast.style}
            icon={toast.icon}
            heading={toast.heading}
            message={toast.message}
            duration={toast.duration}
            onClick={handleClick}
          />
        ))}
      </div>
    );
  }
}
