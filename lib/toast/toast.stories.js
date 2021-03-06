import React from 'react';

import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import {
  withKnobs,
  text,
  optionsKnob as options
} from '@storybook/addon-knobs';

import OCUniform from '../uniform';
import OCToast from './toast';

import uniformStyles from '../../.storybook/storybook';

const toastHeading = ['Heading', 'Just so you know...'];
const toastMessage = ['Message', 'I am some trivial information.'];
const toastState = [
  'State',
  {
    Default: '',
    Error: 'error',
    Success: 'success'
  },
  '',
  { display: 'inline-radio' }
];

const stories = storiesOf('Toast', module);

stories.addDecorator(withA11y).addDecorator(withKnobs);

stories.add('Default', () => {
  const heading = text(...toastHeading);
  const message = text(...toastMessage);
  const state = options(...toastState);

  return (
    <OCUniform
      tag="div"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh'
      }}>
      <OCToast
        style={uniformStyles}
        id="storybook-toast"
        modifiers={state ? `toast--${state}` : null}
        heading={heading ? heading : 'Add heading'}
        message={message ? message : 'Add message'}></OCToast>
    </OCUniform>
  );
});
