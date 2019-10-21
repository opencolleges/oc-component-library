import _ from 'lodash';
import React from 'react';

import Badge from '../badge';

import BEM from '../utilities/ts/bem';
import namespace from '../utilities/ts/namespace';

const COORDS = {
  l: {
    cx: `24`,
    cy: `24`,
    r: `23.5`,
    viewBox: `0 0 48 48`
  },
  m: {
    cx: `20`,
    cy: `20`,
    r: `19.5`,
    viewBox: `0 0 40 40`
  },
  s: {
    cx: `16`,
    cy: `16`,
    r: `15.5`,
    viewBox: `0 0 32 32`
  }
};

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
      {Object.keys(COORDS).map((size, index) => {
        return (
          _.includes(_.split(props.modifiers, ` `), size) &&
          (!_.isUndefined(props.href) && (
            <svg
              key={index}
              className={bem.getElement(`border-outer`)}
              viewBox={COORDS[size].viewBox}>
              <circle
                className={bem.getElement(`border`)}
                cx={COORDS[size].cx}
                cy={COORDS[size].cy}
                r={COORDS[size].r}
              />
            </svg>
          ))
        );
      })}
      {/* FIX THIS */}
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
      {!_.includes(_.split(props.modifiers, ` `), `s`) && (
        <React.Fragment>
          {_.includes(_.split(props.modifiers, ` `), `error`) && (
            <Badge value={props.value} modifiers="error" />
          )}
          {_.includes(_.split(props.modifiers, ` `), `success`) && (
            <Badge value={props.value} modifiers="success" />
          )}
        </React.Fragment>
      )}
    </Tag>
  );
};

Avatar.defaultProps = {
  firstName: ``,
  sex: `undisclosed`
};

export default Avatar;
