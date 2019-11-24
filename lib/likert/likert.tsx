import React from 'react';
import BEM, { BEMInterface } from '../utilities/ts/bem';
import getScale from './utilities/get-scale';
import hasLabel from './utilities/has-label';

interface LikertOptionInterface {
  id?: string;
  label?: string;
}

interface Props {
  className?: string;
  modifiers?: string;
  name?: string;
  onChange?: () => void;
  options: LikertOptionInterface[];
  style?: React.CSSProperties;
}

interface State {
  value?: string;
}

interface RenderInterface {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  props: Props;
  scale: LikertOptionInterface[];
  state: State;
}

class Likert extends React.Component<Props, State> {
  static defaultProps: Partial<Props> = {
    onChange: () => {
      return;
    }
  };

  readonly state: Readonly<State> = {
    value: ``
  };

  scale: LikertOptionInterface[] = getScale(this.props.options);

  handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      value: e.target.value
    });
  };

  render() {
    const { props, state, scale, handleChange }: RenderInterface = this;

    const BEM_MODULE: BEMInterface = BEM(`likert`);
    const {
      addClassNames,
      addModifiers,
      getElement,
      getModifier,
      getResult
    }: BEMInterface = BEM_MODULE;

    addModifiers(props.modifiers);
    addClassNames(props.className);

    return (
      <div className={getResult()} style={props.style}>
        <div
          className={`${getElement(`list`)} ${getModifier(
            `${scale.length}`,
            `list`
          )}`}>
          {scale.map((option, i) => (
            <div
              key={i}
              className={`${getElement(`item`)}${
                i + 1 !== Number(state.value) ? `` : ` active`
              }`}>
              <input
                id={option.id}
                className={getElement(`input`)}
                type="radio"
                name={props.name}
                value={i + 1}
                tabIndex={0}
                onChange={handleChange}
              />
              <div className={getElement(`label-outer`)}>
                <label htmlFor={option.id} className={getElement(`button`)}>
                  {scale.length > 10 ? i : i + 1}
                </label>
                {hasLabel(scale, i) && option.label && (
                  <span className={getElement(`label`)}>{option.label}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export { Likert as default, LikertOptionInterface };
