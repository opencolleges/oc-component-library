import React from 'react';

import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import {
  boolean,
  withKnobs,
  text,
  optionsKnob as options
} from '@storybook/addon-knobs';

import Uniform from '../uniform';
import Text from './text';

import UNIFORM_STYLES from '../../.storybook/storybook';

const textLabel = ['Label', 'Username'];
const textPlaceholder = ['Placeholder', 'aVaultier'];
const textValue = ['Value', ''];
const textType = [
  'Type',
  {
    Text: '',
    Password: 'password',
    Number: 'number',
    Tel: 'tel',
    Email: 'email',
    URL: 'url'
  },
  '',
  { display: 'inline-radio' }
];
const textState = [
  'State',
  {
    Default: '',
    Error: 'error',
    Success: 'success'
  },
  '',
  { display: 'inline-radio' }
];
const textDisabled = ['Disabled', false];
const textReadOnly = ['Read only', false];
const textRequired = ['Required', true];
const textErrorMessage = ['Error Message', 'Something is wrong'];
const textSuccessMessage = ['Success Message', 'Something is right'];

const stories = storiesOf('Text', module);

stories.addDecorator(withA11y).addDecorator(withKnobs);

stories.add('Default', () => {
  const label = text(...textLabel);
  const placeholder = text(...textPlaceholder);
  const value = text(...textValue);
  const type = options(...textType);
  const state = options(...textState);
  const disabled = boolean(...textDisabled);
  const readOnly = boolean(...textReadOnly);
  const required = boolean(...textRequired);
  const errorMessage = state === 'error' && text(...textErrorMessage);
  const successMessage = state === 'success' && text(...textSuccessMessage);

  return (
    <Uniform tag="div" style={{ ...UNIFORM_STYLES, width: '50%' }}>
      {state === 'error' ? (
        <Text
          name="storybook-text-component"
          label={label ? label : 'Add label'}
          placeholder={placeholder}
          value={value}
          modifiers="text--error"
          type={type ? type : null}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          message={errorMessage ? errorMessage : 'Add message'}
        />
      ) : state === 'success' ? (
        <Text
          name="storybook-text-component"
          label={label ? label : 'Add label'}
          placeholder={placeholder}
          value={value}
          modifiers="text--success"
          type={type ? type : null}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          message={successMessage ? successMessage : 'Add message'}
        />
      ) : (
        <Text
          name="storybook-text-component"
          label={label ? label : 'Add label'}
          placeholder={placeholder}
          value={value}
          type={type ? type : null}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
        />
      )}
    </Uniform>
  );
});
