import React from 'react';

import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import {
  array,
  boolean,
  number,
  optionsKnob as options,
  text,
  withKnobs
} from '@storybook/addon-knobs';

import Uniform from '../uniform';
import File from './file';

import uniformStyles from '../../.storybook/storybook';

const fileFileSize = ['Max File size (bytes)', 10485760];
const fileFileTypes = ['File types', ['jpg', 'jpeg', 'png', 'pdf']];
const fileSize = [
  'Size',
  {
    Small: 's',
    Medium: 'm',
    Large: 'l'
  },
  's',
  { display: 'inline-radio' }
];
const fileState = [
  'State',
  {
    Default: '',
    Error: 'error',
    Success: 'success'
  },
  '',
  { display: 'inline-radio' }
];
const fileMultiple = ['Multiple', false];
const fileErrorMessage = ['Error Message', 'Something is wrong'];
const fileSuccessMessage = ['Success Message', 'Something is right'];

const stories = storiesOf('File', module);

stories.addDecorator(withA11y).addDecorator(withKnobs);

stories.add('Default', () => {
  const FileSize = number(...fileFileSize);
  const fileTypes = array(...fileFileTypes);
  const size = options(...fileSize);
  const state = options(...fileState);
  const multiple = boolean(...fileMultiple);
  const errorMessage = state === 'error' && text(...fileErrorMessage);
  const successMessage = state === 'success' && text(...fileSuccessMessage);

  return (
    <Uniform style={{ ...uniformStyles, width: '50%' }}>
      {state === 'error' ? (
        <File
          modifiers={`${size ? `file--${size} ` : ''}file--error`}
          name="storybook-file-component"
          fileSize={FileSize}
          fileTypes={fileTypes}
          multiple={multiple}
          message={errorMessage ? errorMessage : 'Add message'}
        />
      ) : state === 'success' ? (
        <File
          modifiers={`${size ? `file--${size} ` : ''}file--success`}
          name="storybook-file-component"
          fileSize={FileSize}
          fileTypes={fileTypes}
          multiple={multiple}
          message={successMessage ? successMessage : 'Add message'}
        />
      ) : (
        <File
          modifiers={size ? `file--${size}` : ''}
          name="storybook-file-component"
          fileSize={FileSize}
          fileTypes={fileTypes}
          multiple={multiple}
        />
      )}
    </Uniform>
  );
});
