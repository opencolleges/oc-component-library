import * as React from 'react';

import { Props } from './divider.interface';

import namespace from '../utilities/ts/namespace';

import * as _ from 'lodash';

const Divider: React.FC<Props> = props => {
  const classNames: string = _.trim(
    `${namespace('divider', props.modifiers)} ${_.toString(props.className)}`
  );

  return <div className={classNames} style={props.style} aria-hidden="true" />;
};

Divider.defaultProps = {
  modifiers: 'divider--s'
};

export default Divider;
