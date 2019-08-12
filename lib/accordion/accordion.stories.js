import React from 'react';

import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { text, withKnobs } from '@storybook/addon-knobs';

import OCUniform from '../uniform';
import OCAccordion from './accordion';
import OCCopy from '../copy';

import uniformStyles from '../../.storybook/storybook';

const accordionLabel = ['Label', 'Heading test'];
const accordionChildren = ['Content', 'Body copy'];

const stories = storiesOf('Accordion', module);

stories.addDecorator(withA11y).addDecorator(withKnobs);

stories.add('Default', () => {
  const label = text(...accordionLabel);
  const children = text(...accordionChildren);

  return (
    <OCUniform tag="div" style={{ ...uniformStyles, width: '50%' }}>
      <OCAccordion label={label ? label : 'Add label'}>
        <OCCopy>{children ? children : 'Add content'}</OCCopy>
      </OCAccordion>
    </OCUniform>
  );
});
