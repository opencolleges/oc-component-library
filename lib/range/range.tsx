import _ from 'lodash';
import React from 'react';

import { NAMESPACE } from '../utilities/ts/constants';

import BEM from '../utilities/ts/bem';

interface Props {
  className?: string;
  id?: string;
  label: string;
  max?: number;
  min?: number;
  name?: string;
  onChange?: (event: any) => void;
  style?: React.CSSProperties;
  value?: number;
}

interface State {
  value: number;
}

export default class Range extends React.Component<Props> {
  static defaultProps: Partial<Props> = {
    max: 100,
    min: 0,
    onChange: () => {
      return;
    }
  };

  readonly state: Readonly<State> = {
    value: this.props.value
      ? this.props.value
      : (Number(this.props.max) - Number(this.props.min)) / 2 +
        Number(this.props.min)
  };

  id: string = this.props.id ? this.props.id : _.uniqueId(`${NAMESPACE}-`);

  componentDidUpdate(prevProps): void {
    if (this.props.value !== prevProps.value) {
      this.setState({
        value: this.props.value
      });
    }
  }

  handleChange = (e): void => {
    this.setState({ value: e.target.value });

    this.props.onChange(e);
  };

  render() {
    const { props, state, id, handleChange } = this;

    const bem = BEM(`range`);
    bem.addClassNames(props.className);

    return (
      <div className={bem.getResult()} style={props.style}>
        <input
          id={id}
          className={bem.getElement(`input`)}
          type="range"
          name={props.name}
          value={state.value}
          min={props.min}
          max={props.max}
          onChange={handleChange}
        />
        <label htmlFor={id} className={bem.getElement(`label`)}>
          {props.label}
        </label>
        <div
          className={bem.getElement(`track`)}
          style={{
            width: `${((state.value - props.min) /
              (Number(props.max) - Number(props.min))) *
              100}%`
          }}
          aria-hidden="true"
        />
        <div
          className={bem.getElement(`thumb`)}
          style={{
            left: `${((state.value - props.min) /
              (Number(props.max) - Number(props.min))) *
              100}%`,
            transform: `translateX(-${((state.value - props.min) /
              (Number(props.max) - Number(props.min))) *
              100}%)`
          }}
          aria-hidden="true"
        />
        <span className={bem.getElement(`value`)}>{state.value}</span>
      </div>
    );
  }
}
