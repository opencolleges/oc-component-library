import * as _ from 'lodash';
import * as React from 'react';

import namespace from '../utilities/js/namespace';

import ITableBodyProps from './table-body.types';

const TableBody: React.FC<ITableBodyProps> = props => {
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
