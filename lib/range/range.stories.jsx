import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { number, text, withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import Range from './range';
import Uniform from '../uniform';
import UNIFORM_STYLES from '../../.storybook/storybook';

const rangeLabel = [`Label`, `Pick a number between 0 and 100`];
const rangeValue = [
  `Value`,
  21,
  {
    range: true,
    min: 0,
    max: 100,
    step: 1
  }
];

const stories = storiesOf(`Range`, module);

stories.addDecorator(withA11y).addDecorator(withKnobs);

stories.add(`Default`, () => {
  const label = text(...rangeLabel);
  const value = number(...rangeValue);

  return (
    <Uniform tag="div" style={{ ...UNIFORM_STYLES, width: `50%` }}>
      <Range
        name="storybook-range-component"
        label={label ? label : `Add label`}
        value={value}
      />
    </Uniform>
  );
});
