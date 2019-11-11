import React from 'react';
import Badge from '../badge';
import BEM, { BEMInterface } from '../utilities/ts/bem';
import includes from '../utilities/ts/includes';
import isUndefined from '../utilities/ts/is-undefined';
import itemise from '../utilities/ts/itemise';
import randomise from '../utilities/ts/randomise';

interface BorderSizeInterface {
  cx: string;
  cy: string;
  r: string;
  viewBox: string;
}

interface BorderSizesInterface {
  l: BorderSizeInterface;
  m: BorderSizeInterface;
  s: BorderSizeInterface;
}

const BORDER_SIZES: BorderSizesInterface = {
  l: { cx: `24`, cy: `24`, r: `23.5`, viewBox: `0 0 48 48` },
  m: { cx: `20`, cy: `20`, r: `19.5`, viewBox: `0 0 40 40` },
  s: { cx: `16`, cy: `16`, r: `15.5`, viewBox: `0 0 32 32` }
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
  }: BEMInterface = BEM_MODULE;

  addModifiers(props.modifiers);
  addClassNames(props.className);

  return (
    <Tag
      className={getResult()}
      style={props.style}
      href={props.href}
      title={props.firstName}>
      {Object.keys(BORDER_SIZES).map(
        (size, i) =>
          includes(itemise(props.modifiers), size) &&
          (!isUndefined(props.href) && (
            <svg
              key={i}
              className={getElement(`border-outer`)}
              viewBox={BORDER_SIZES[size].viewBox}>
              <circle
                className={getElement(`border`)}
                cx={BORDER_SIZES[size].cx}
                cy={BORDER_SIZES[size].cy}
                r={BORDER_SIZES[size].r}
              />
            </svg>
          ))
      )}
      <div
        className={`${getElement(`image`)} ${getModifier(
          `${props.sex}-${props.sex !== `undisclosed` ? randomise(1, 2) : ``}`,
          `image`
        )}`}
        style={
          props.image && {
            background: `url('${props.image}'), rgb(255, 255, 255)`,
            backgroundPosition: `center`,
            backgroundRepeat: `no-repeat`,
            backgroundSize: `cover`
          }
        }
      />
      {!includes(itemise(props.modifiers), `s`) && (
        <React.Fragment>
          {includes(itemise(props.modifiers), `error`) && (
            <Badge value={props.value} modifiers="error" />
          )}
          {includes(itemise(props.modifiers), `success`) && (
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
