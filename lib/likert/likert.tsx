import React from 'react';

import BEM from '../utilities/ts/bem';
import getLikertScale from './utilities/get-likert-scale';
import hasLikertLabel from './utilities/has-likert-label';

interface Props {
  className?: string;
  modifiers?: string;
  name?: string;
  onChange?: () => void;
  options: Array<{ label?: string }>;
  style?: React.CSSProperties;
}

interface State {
  value?: string;
}

export default class Likert extends React.Component<Props, State> {
  static defaultProps: Partial<Props> = {
    onChange: () => {
      return;
    }
  };

  readonly state: Readonly<State> = {
    value: ''
  };

  scale: Array<{ id: string; label: string }> = getLikertScale(
    this.props.options
  );

  handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      value: event.target.value
    });
  };

  render() {
    const { props, state, scale, handleChange } = this;

    const bem = BEM('likert');
    bem.addModifiers(props.modifiers);
    bem.addClassNames(props.className);

    return (
      <div className={bem.getResult()} style={props.style}>
        <div
          className={`${bem.getElement('list')} ${bem.getModifier(
            `${scale.length}`,
            'list'
          )}`}>
          {scale.map((option, i) => (
            <div
              key={i}
              className={`${bem.getElement('item')}${
                i + 1 !== Number(state.value) ? '' : ' active'
              }`}>
              <input
                id={option.id}
                className={bem.getElement('input')}
                type="radio"
                name={props.name}
                value={i + 1}
                tabIndex={0}
                onChange={handleChange}
              />
              <div className={bem.getElement('label-outer')}>
                <label htmlFor={option.id} className={bem.getElement('button')}>
                  {scale.length > 10 ? i : i + 1}
                </label>
                {hasLikertLabel(scale, i) && option.label && (
                  <span className={bem.getElement('label')}>
                    {option.label}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
