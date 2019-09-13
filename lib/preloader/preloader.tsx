import * as React from 'react';

import { Props } from './preloader.interface';

import namespace from '../utilities/ts/namespace';

import * as _ from 'lodash';

const Preloader: React.FC<Props> = props => {
  const classNames: string = _.trim(
    `${namespace('preloader', props.active ? 'active' : '')} ${_.toString(
      props.className
    )}`
  );

  return (
    <div className={classNames} style={props.style}>
      <svg
        className={namespace('preloader__stroke-outer')}
        viewBox="0 0 96 96"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        aria-hidden="true">
        <circle
          className={namespace('preloader__stroke preloader__stroke--1')}
          cx="48"
          cy="48"
          r="44"
        />
        <circle
          className={namespace('preloader__stroke preloader__stroke--2')}
          cx="48"
          cy="48"
          r="44"
        />
        <circle
          className={namespace('preloader__stroke preloader__stroke--3')}
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
