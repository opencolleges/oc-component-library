import * as _ from 'lodash';
import * as React from 'react';

import namespace from '../utilities/js/namespace';

import ITableHeadProps from './table-head.types';

const TableHead: React.FC<ITableHeadProps> = props => {
  const classNames: string = _.trim(
    `${namespace('thead')} ${_.toString(props.className)}`
  );

  return (
    <thead className={classNames} style={props.style}>
      {props.children}
    </thead>
  );
};

export default TableHead;
