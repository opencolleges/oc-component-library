import React from 'react';

import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import {
  withKnobs,
  text,
  optionsKnob as options
} from '@storybook/addon-knobs';

import OCUniform from '../uniform';
import OCTable from './table';
import OCTableHead from '../table-head';
import OCTableBody from '../table-body';
import OCTableRow from '../table-row';
import OCTableCell from '../table-cell';

import uniformStyles from '../../.storybook/storybook';

const tableRow1Cell1 = ['Row 1, cell 1', 'Height'];
const tableRow1Cell2 = ['Row 1, cell 2', 'Width'];
const tableRow1Cell3 = ['Row 1, cell 3', 'Depth'];
const tableRow2Cell1 = ['Row 2, cell 1', '1000mm'];
const tableRow2Cell2 = ['Row 2, cell 2', '1200mm'];
const tableRow2Cell3 = ['Row 2, cell 3', '500mm'];
const tableRow3Cell1 = ['Row 3, cell 1', '7500mm'];
const tableRow3Cell2 = ['Row 3, cell 2', '1000mm'];
const tableRow3Cell3 = ['Row 3, cell 3', '800mm'];
const tableType = [
  'Type',
  {
    Default: '',
    Alt: 'alt'
  },
  '',
  { display: 'inline-radio' }
];
const TableAlignment = [
  'Table alignment',
  { Default: '', Center: 'center', Right: 'right' },
  '',
  { display: 'inline-radio' }
];

const stories = storiesOf('Table', module);

stories.addDecorator(withA11y).addDecorator(withKnobs);

stories.add('Default', () => {
  const row1Cell1 = text(...tableRow1Cell1);
  const row1Cell2 = text(...tableRow1Cell2);
  const row1Cell3 = text(...tableRow1Cell3);
  const row2Cell1 = text(...tableRow2Cell1);
  const row2Cell2 = text(...tableRow2Cell2);
  const row2Cell3 = text(...tableRow2Cell3);
  const row3Cell1 = text(...tableRow3Cell1);
  const row3Cell2 = text(...tableRow3Cell2);
  const row3Cell3 = text(...tableRow3Cell3);
  const type = options(...tableType);
  const tableAlignment = options(...TableAlignment);

  return (
    <OCUniform tag="div" style={{ ...uniformStyles, width: '50%' }}>
      <OCTable
        modifiers={`${tableAlignment !== '' ? `table--${tableAlignment}` : ''}${
          type !== '' ? ` table--${type}` : ''
        }`}>
        <OCTableHead>
          <OCTableRow>
            <OCTableCell tag="th">
              {row1Cell1 ? row1Cell1 : 'Add header'}
            </OCTableCell>
            <OCTableCell tag="th">
              {row1Cell2 ? row1Cell2 : 'Add header'}
            </OCTableCell>
            <OCTableCell tag="th">
              {row1Cell3 ? row1Cell3 : 'Add header'}
            </OCTableCell>
          </OCTableRow>
        </OCTableHead>
        <OCTableBody>
          <OCTableRow>
            <OCTableCell>{row2Cell1 ? row2Cell1 : 'Add data'}</OCTableCell>
            <OCTableCell>{row2Cell2 ? row2Cell2 : 'Add data'}</OCTableCell>
            <OCTableCell>{row2Cell3 ? row2Cell3 : 'Add data'}</OCTableCell>
          </OCTableRow>
          <OCTableRow>
            <OCTableCell>{row3Cell1 ? row3Cell1 : 'Add data'}</OCTableCell>
            <OCTableCell>{row3Cell2 ? row3Cell2 : 'Add data'}</OCTableCell>
            <OCTableCell>{row3Cell3 ? row3Cell3 : 'Add data'}</OCTableCell>
          </OCTableRow>
        </OCTableBody>
      </OCTable>
    </OCUniform>
  );
});
