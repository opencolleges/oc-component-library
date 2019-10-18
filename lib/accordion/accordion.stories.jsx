import React from 'react';

import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { text, withKnobs } from '@storybook/addon-knobs';

import Uniform from '../uniform';
import Accordion from './accordion';
import Copy from '../copy';

import UNIFORM_STYLES from '../../.storybook/storybook';

const accordionLabel = ['Label', 'Heading'];
const accordionChildren = ['Content', 'Body copy'];

const stories = storiesOf('Accordion', module);

stories.addDecorator(withA11y).addDecorator(withKnobs);

stories.add('Default', () => {
  const label = text(...accordionLabel);
  const children = text(...accordionChildren);

  return (
    <Uniform tag="div" style={{ ...UNIFORM_STYLES, width: '50%' }}>
      <Accordion label={label ? label : 'Add label'}>
        <Copy>{children ? children : 'Add content'}</Copy>
      </Accordion>
    </Uniform>
  );
});
