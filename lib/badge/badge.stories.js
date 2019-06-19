import React from 'react';
import { storiesOf } from '@storybook/react';

import { withKnobs, select, text } from '@storybook/addon-knobs';

import OCUniform from '../uniform';
import OCBadge from './badge';

const stories = storiesOf('Badge', module);

stories.addDecorator(withKnobs);

stories.add('Default', () => {
  return (
    <OCUniform
      tag="div"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
      <OCBadge
        value={text('Value', '1000')}
        modifiers={select(
          'State',
          { Default: null, Error: 'badge--error', Success: 'badge--success' },
          null
        )}
      />
    </OCUniform>
  );
});
