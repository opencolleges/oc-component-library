import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';

import { boolean, withKnobs } from '@storybook/addon-knobs';

import Uniform from '../uniform';
import Preloader from './preloader';

import UNIFORM_STYLES from '../../.storybook/storybook';

const preloaderActive = ['Loading', true];

const stories = storiesOf('Preloader', module);

stories.addDecorator(withA11y).addDecorator(withKnobs);

stories.add('Default', () => {
  const active = boolean(...preloaderActive);

  return (
    <Uniform tag="div" style={UNIFORM_STYLES}>
      <Preloader active={active} />
    </Uniform>
  );
});
