import React from 'react';

import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs, optionsKnob as options } from '@storybook/addon-knobs';

import Uniform from '../uniform';
import Divider from './divider';

import UNIFORM_STYLES from '../../.storybook/storybook';

const dividerState = [
  'State',
  {
    Default: '',
    Alt: 'alt'
  },
  ``,
  { display: 'inline-radio' }
];

const stories = storiesOf('Divider', module);

stories.addDecorator(withA11y).addDecorator(withKnobs);

stories
  .add('Small', () => {
    const state = options(...dividerState);

    return (
      <Uniform tag="div" style={{ ...UNIFORM_STYLES, width: '50%' }}>
        <Divider modifiers={`divider--s${state ? ` divider--${state}` : ''}`} />
      </Uniform>
    );
  })
  .add('Medium', () => {
    const state = options(...dividerState);

    return (
      <Uniform tag="div" style={{ ...UNIFORM_STYLES, width: '50%' }}>
        <Divider modifiers={`divider--m${state ? ` divider--${state}` : ''}`} />
      </Uniform>
    );
  })
  .add('Large', () => {
    const state = options(...dividerState);

    return (
      <Uniform tag="div" style={{ ...UNIFORM_STYLES, width: '50%' }}>
        <Divider modifiers={`divider--l${state ? ` divider--${state}` : ''}`} />
      </Uniform>
    );
  });
