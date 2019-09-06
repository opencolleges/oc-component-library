import * as React from 'react';

import { Props } from './table-body.interface';

import namespace from '../utilities/js/namespace';

import * as _ from 'lodash';

const TableBody: React.FC<Props> = props => {
  const classNames: string = _.trim(
    `${namespace('tbody')} ${_.toString(props.className)}`
  );

  return (
    <tbody className={classNames} style={props.style}>
      {props.children}
    </tbody>
  );
};

export default TableBody;
