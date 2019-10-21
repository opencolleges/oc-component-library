import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';

import {
  number,
  optionsKnob as options,
  text,
  withKnobs
} from '@storybook/addon-knobs';

import Uniform from '../uniform';
import Progress from './progress';

import UNIFORM_STYLES from '../../.storybook/storybook';

const progressProgress = [
  `Progress`,
  21,
  {
    range: true,
    min: 0,
    max: 100,
    step: 1
  }
];
const progressSteps = [
  `Steps`,
  3,
  {
    range: true,
    min: 0,
    max: 8,
    step: 1
  }
];
const progressType = [
  `Type`,
  { Default: ``, Alt: `alt` },
  ``,
  { display: `inline-radio` }
];
const progressState = [
  `State`,
  {
    Default: ``,
    Error: `error`
  },
  ``,
  { display: `inline-radio` }
];
const progressMessage = [`Message`, `File type not supported`];

const stories = storiesOf(`Progress`, module);

stories.addDecorator(withA11y).addDecorator(withKnobs);

stories.add(`Default`, () => {
  const type = options(...progressType);
  const progress =
    type !== `alt` ? number(...progressProgress) : number(...progressSteps);
  const state = type !== `alt` ? options(...progressState) : ``;
  const message =
    progress !== 100 && state === `error` ? text(...progressMessage) : ``;

  return (
    <Uniform tag="div" style={{ ...UNIFORM_STYLES, width: `50%` }}>
      <Progress
        modifiers={`${type ? `progress--${type}` : ``}${
          progress !== 100 && state ? ` progress--${state}` : ``
        }`}
        progress={progress}
        totalProgress={type !== `alt` ? 100 : 8}
        message={
          progress !== 100 && state === `error`
            ? message
              ? message
              : `Add label`
            : null
        }
      />
    </Uniform>
  );
});
