import React from 'react';

import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import {
  boolean,
  optionsKnob as options,
  text,
  withKnobs
} from '@storybook/addon-knobs';

import OCUniform from '../uniform';
import OCCheckbox from './checkbox';

import uniformStyles from '../../.storybook/storybook';

const checkboxChildren = ['Label', 'Yes, this assessment is my own work.'];
const checkboxAlignment = [
  'Alignment',
  { Default: '', Right: 'right' },
  '',
  { display: 'inline-radio' }
];
const checkboxState = [
  'State',
  {
    Default: '',
    Error: 'error',
    Success: 'success',
    Reversed: 'reversed'
  },
  '',
  { display: 'inline-radio' }
];
const checkboxReadOnly = ['Read only', false];
const checkboxDisabled = ['Disabled', false];

const stories = storiesOf('Checkbox', module);

stories.addDecorator(withA11y).addDecorator(withKnobs);

stories.add('Default', () => {
  const children = text(...checkboxChildren);
  const alignment = options(...checkboxAlignment);
  const state = options(...checkboxState);
  const disabled = boolean(...checkboxDisabled);
  const readOnly = boolean(...checkboxReadOnly);

  return (
    <OCUniform tag="div" style={uniformStyles}>
      <OCCheckbox
        name="storybook-checkbox-component"
        modifiers={`${alignment ? `checkbox--${alignment}` : ''}${
          state ? ` checkbox--${state}` : ''
        }`}
        disabled={disabled}
        readOnly={readOnly}>
        {children ? children : 'Add label'}
      </OCCheckbox>
    </OCUniform>
  );
});
