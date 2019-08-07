import * as _ from 'lodash';
import * as React from 'react';

import namespace from '../utilities/js/namespace';

import IDividerProps from './divider.types';

const Divider: React.FC<IDividerProps> = props => {
  const classNames: string = _.trim(
    `${namespace('divider', props.modifiers)} ${_.toString(props.className)}`
  );

  return <div className={classNames} style={props.style} />;
};

Divider.defaultProps = {
  modifiers: 'divider--s'
};

export default Divider;
