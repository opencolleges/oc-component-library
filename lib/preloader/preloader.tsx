import * as React from 'react';

import { Props } from './preloader.interface';

import BEM from '../utilities/ts/bem';

const Preloader: React.FC<Props> = props => {
  const bem = BEM('preloader');
  bem.addClassNames(props.active ? 'active' : '');
  bem.addClassNames(props.className);

  return (
    <div className={bem.getResult()} style={props.style}>
      <svg
        className={bem.getElement('stroke-outer')}
        viewBox="0 0 96 96"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        aria-hidden="true">
        <circle
          className={`${bem.getElement('stroke')} ${bem.getModifier(
            '1',
            'stroke'
          )}`}
          cx="48"
          cy="48"
          r="44"
        />
        <circle
          className={`${bem.getElement('stroke')} ${bem.getModifier(
            '2',
            'stroke'
          )}`}
          cx="48"
          cy="48"
          r="44"
        />
        <circle
          className={`${bem.getElement('stroke')} ${bem.getModifier(
            '3',
            'stroke'
          )}`}
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

export default Preloader;
