import React from 'react';

import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import {
  boolean,
  optionsKnob as options,
  text,
  withKnobs
} from '@storybook/addon-knobs';

import Uniform from '../uniform';
import Date from './date';

import UNIFORM_STYLES from '../../.storybook/storybook';

const dateLabel = ['Label', 'Date'];
const dateMinDate = ['Minimum date', '2018-12-20'];
const dateMaxDate = ['Maximum date', ''];
const dateAlignment = [
  'Alignment',
  { Default: ``, Right: 'right' },
  '',
  { display: 'inline-radio' }
];
const dateState = [
  'State',
  {
    Default: '',
    Error: 'error',
    Success: 'success'
  },
  '',
  { display: 'inline-radio' }
];
const dateDisabled = ['Disabled', false];
const dateReadOnly = ['Read only', false];
const dateRequired = ['Required', false];
const dateErrorMessage = ['Error Message', 'Something is wrong'];
const dateSuccessMessage = ['Success Message', 'Something is right'];

const stories = storiesOf('Date', module);

stories.addDecorator(withA11y).addDecorator(withKnobs);

stories.add('Default', () => {
  const label = text(...dateLabel);
  const minDate = text(...dateMinDate);
  const maxDate = text(...dateMaxDate);
  const alignment = options(...dateAlignment);
  const state = options(...dateState);
  const disabled = boolean(...dateDisabled);
  const readOnly = boolean(...dateReadOnly);
  const required = boolean(...dateRequired);
  const errorMessage = state === 'error' && text(...dateErrorMessage);
  const successMessage = state === 'success' && text(...dateSuccessMessage);

  return (
    <Uniform style={{ ...UNIFORM_STYLES, width: '50%' }}>
      {state === 'error' ? (
        <Date
          name="storybook-date-component"
          label={label ? label : 'Add label'}
          minDate={minDate}
          maxDate={maxDate}
          modifiers={`${alignment ? `date--${alignment}` : ''}${
            state ? ` date--${state}` : ''
          }`}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          message={errorMessage ? errorMessage : 'Add message'}
        />
      ) : state === 'success' ? (
        <Date
          name="storybook-date-component"
          label={label ? label : 'Add label'}
          minDate={minDate}
          maxDate={maxDate}
          modifiers={`${alignment ? `date--${alignment}` : ''}${
            state ? ` date--${state}` : ''
          }`}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          message={successMessage ? successMessage : 'Add message'}
        />
      ) : (
        <Date
          name="storybook-date-component"
          label={label ? label : 'Add label'}
          minDate={minDate}
          maxDate={maxDate}
          modifiers={`${alignment ? `date--${alignment}` : ''}${
            state ? ` date--${state}` : ''
          }`}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
        />
      )}
    </Uniform>
  );
});
