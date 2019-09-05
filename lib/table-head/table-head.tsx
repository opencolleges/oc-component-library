import * as React from 'react';

import { IProps } from './table-head.interface';

import namespace from '../utilities/js/namespace';

import * as _ from 'lodash';

const TableHead: React.FC<IProps> = props => {
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
