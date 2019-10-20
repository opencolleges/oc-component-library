import _ from 'lodash';
import React from 'react';

import Badge from '../badge';

import { AVATAR_COORDINATES } from '../utilities/ts/constants';

import BEM from '../utilities/ts/bem';
import namespace from '../utilities/ts/namespace';

type TSex = `female` | `male` | `undisclosed`;

interface Props {
  className?: string;
  firstName: string;
  href?: string;
  image?: string;
  modifiers?: string;
  sex: TSex;
  style?: React.CSSProperties;
  value?: number;
}

const Avatar: React.FC<Props> = props => {
  const Tag: keyof JSX.IntrinsicElements = _.isUndefined(props.href)
    ? `div`
    : `a`;

  const bem = BEM(`avatar`);
  bem.addModifiers(props.modifiers);
  bem.addClassNames(props.className);

  return (
    <Tag
      className={bem.getResult()}
      style={props.style}
      href={props.href}
      title={props.firstName}>
      {Object.keys(AVATAR_COORDINATES).map((size, index) => {
        return (
          _.includes(_.split(props.modifiers, ` `), size) &&
          (!_.isUndefined(props.href) && (
            <svg
              key={index}
              className={bem.getElement(`border-outer`)}
              viewBox={AVATAR_COORDINATES[size].viewBox}>
              <circle
                className={bem.getElement(`border`)}
                cx={AVATAR_COORDINATES[size].cx}
                cy={AVATAR_COORDINATES[size].cy}
                r={AVATAR_COORDINATES[size].r}
              />
            </svg>
          ))
        );
      })}
      <div
        className={namespace(
          `avatar__image avatar__image--${
            props.sex === `female`
              ? `female-${_.random(1, 2)}`
              : props.sex === `male`
              ? `male-${_.random(1, 2)}`
              : `undisclosed-${_.random(1, 2)}`
          }`
        )}
        style={
          props.image && {
            background: `url('${props.image}'), rgb(255, 255, 255)`,
            backgroundPosition: `center`,
            backgroundRepeat: `no-repeat`,
            backgroundSize: `cover`
          }
        }
      />
      {!_.includes(_.split(props.modifiers, ` `), `s`) &&
        _.includes(_.split(props.modifiers, ` `), `error`) && (
          <Badge value={props.value} modifiers="error" />
        )}
      {!_.includes(_.split(props.modifiers, ` `), `s`) &&
        _.includes(_.split(props.modifiers, ` `), `success`) && (
          <Badge value={props.value} modifiers="success" />
        )}
    </Tag>
  );
};

Avatar.defaultProps = {
  firstName: ``,
  sex: `undisclosed`
};

export default Avatar;
