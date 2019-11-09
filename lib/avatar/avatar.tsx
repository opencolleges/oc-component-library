import _ from 'lodash';
import React from 'react';
import Badge from '../badge';
import BEM, { BEMInterface } from '../utilities/ts/bem';
import isUndefined from '../utilities/ts/is-undefined';
import randomise from '../utilities/ts/randomise';

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

type SexTypes = `female` | `male` | `undisclosed`;

interface Props {
  className?: string;
  firstName: string;
  href?: string;
  image?: string;
  modifiers?: string;
  sex: SexTypes;
  style?: React.CSSProperties;
  value?: number;
}

const Avatar: React.FC<Props> = (props: Props) => {
  const Tag: keyof JSX.IntrinsicElements = isUndefined(props.href)
    ? `div`
    : `a`;

  const BEM_MODULE: BEMInterface = BEM(`avatar`);
  const {
    addClassNames,
    addModifiers,
    getElement,
    getModifier,
    getResult
  }: BEMInterface = BEM_MODULE; // ? Review type.

  addModifiers(props.modifiers);
  addClassNames(props.className);

  return (
    <Tag
      className={getResult()}
      style={props.style}
      href={props.href}
      title={props.firstName}>
      {Object.keys(COORDS).map((size, index) => {
        return (
          _.includes(_.split(props.modifiers, ` `), size) &&
          (!isUndefined(props.href) && (
            <svg
              key={index}
              className={getElement(`border-outer`)}
              viewBox={COORDS[size].viewBox}>
              <circle
                className={getElement(`border`)}
                cx={COORDS[size].cx}
                cy={COORDS[size].cy}
                r={COORDS[size].r}
              />
            </svg>
          ))
        );
      })}
      <div
        className={`${getElement(`image`)} ${
          props.sex !== `undisclosed`
            ? getModifier(`${props.sex}-${randomise(1, 2)}`, `image`)
            : getModifier(props.sex, `image`)
        }`}
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

export { Avatar as default };
