import React from 'react';
import BEM, { BEMInterface } from '../utilities/ts/bem';

interface Props {
  active?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const Preloader: React.FC<Props> = (props: Props) => {
  const BEM_MODULE: BEMInterface = BEM(`preloader`);
  const {
    addClassNames,
    getElement,
    getModifier,
    getResult
  }: BEMInterface = BEM_MODULE;

  addClassNames(!!props.active ? `active` : ``);
  addClassNames(props.className);

  return (
    <div className={getResult()} style={props.style}>
      <svg
        className={getElement(`stroke-outer`)}
        viewBox="0 0 96 96"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        aria-hidden="true">
        <circle
          className={`${getElement(`stroke`)} ${getModifier(`1`, `stroke`)}`}
          cx="48"
          cy="48"
          r="44"
        />
        <circle
          className={`${getElement(`stroke`)} ${getModifier(`2`, `stroke`)}`}
          cx="48"
          cy="48"
          r="44"
        />
        <circle
          className={`${getElement(`stroke`)} ${getModifier(`3`, `stroke`)}`}
          cx="48"
          cy="48"
          r="44"
        />
      </svg>
    </div>
  );
};

Preloader.defaultProps = {
  active: false
};

export { Preloader as default };
