import React from 'react';

import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import {
  withKnobs,
  text,
  optionsKnob as options
} from '@storybook/addon-knobs';

import Uniform from '../uniform';
import Toast from './toast';

import UNIFORM_STYLES from '../../.storybook/storybook';

const toastHeading = [`Heading`, `Just so you know...`];
const toastMessage = [`Message`, `I am some trivial information.`];
const toastState = [
  `State`,
  {
    Default: ``,
    Error: `error`,
    Success: `success`
  },
  ``,
  { display: `inline-radio` }
];

const stories = storiesOf(`Toast`, module);

stories.addDecorator(withA11y).addDecorator(withKnobs);

stories.add(`Default`, () => {
  const heading = text(...toastHeading);
  const message = text(...toastMessage);
  const state = options(...toastState);

  return (
    <Uniform
      tag="div"
      style={{
        position: `relative`,
        width: `100vw`,
        height: `100vh`
      }}>
      <Toast
        style={UNIFORM_STYLES}
        id="storybook-toast"
        modifiers={state ? `toast--${state}` : null}
        heading={heading ? heading : `Add heading`}
        message={message ? message : `Add message`}></Toast>
    </Uniform>
  );
});
