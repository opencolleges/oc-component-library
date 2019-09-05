import * as React from 'react';

import { IProps } from './divider.interface';

import namespace from '../utilities/js/namespace';

import * as _ from 'lodash';

const Divider: React.FC<IProps> = props => {
  const classNames: string = _.trim(
    `${namespace('divider', props.modifiers)} ${_.toString(props.className)}`
  );

  return <div className={classNames} style={props.style} aria-hidden="true" />;
};

Divider.defaultProps = {
  modifiers: 'divider--s'
};

export default Divider;
