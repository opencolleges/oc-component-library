import * as React from 'react';

import { Props, State } from './likert.interface';

import getLikertScale from './utilities/get-likert-scale';
import hasLikertLabel from './utilities/has-likert-label';

import namespace from '../utilities/ts/namespace';
import toModifier from '../utilities/ts/to-modifier';

import * as _ from 'lodash';

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

    const classNames: string = _.trim(
      `${namespace(
        'likert',
        toModifier(props.modifiers, 'likert')
      )} ${_.toString(props.className)}`
    );

    return (
      <div className={classNames} style={props.style}>
        <div
          className={namespace(`likert__list likert__list--${scale.length}`)}>
          {scale.map((option, i) => (
            <div
              key={i}
              className={
                i + 1 !== Number(state.value)
                  ? namespace('likert__item')
                  : namespace('likert__item active')
              }>
              <input
                id={option.id}
                className={namespace('likert__input')}
                type="radio"
                name={props.name}
                value={i + 1}
                tabIndex={0}
                onChange={handleChange}
              />
              <div className={namespace('likert__label-outer')}>
                <label
                  htmlFor={option.id}
                  className={namespace('likert__button')}>
                  {scale.length > 10 ? i : i + 1}
                </label>
                {hasLikertLabel(scale, i) && option.label && (
                  <span className={namespace('likert__label')}>
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
