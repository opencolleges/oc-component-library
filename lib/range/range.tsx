import _ from 'lodash';
import React from 'react';
import BEM, { BEMInterface } from '../utilities/ts/bem';
import getId from '../utilities/ts/get-id';

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

class Range extends React.Component<Props> {
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

  id: string = this.props.id ? this.props.id : getId();

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

    const BEM_MODULE: BEMInterface = BEM(`range`);
    const { addClassNames, getElement, getResult }: BEMInterface = BEM_MODULE;

    addClassNames(props.className);

    return (
      <div className={getResult()} style={props.style}>
        <input
          id={id}
          className={getElement(`input`)}
          type="range"
          name={props.name}
          value={state.value}
          min={props.min}
          max={props.max}
          onChange={handleChange}
        />
        <label htmlFor={id} className={getElement(`label`)}>
          {props.label}
        </label>
        <div
          className={getElement(`track`)}
          style={{
            width: `${((state.value - props.min) /
              (Number(props.max) - Number(props.min))) *
              100}%`
          }}
          aria-hidden="true"
        />
        <div
          className={getElement(`thumb`)}
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
        <span className={getElement(`value`)}>{state.value}</span>
      </div>
    );
  }
}

export { Range as default };
