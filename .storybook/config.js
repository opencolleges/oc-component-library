import { addParameters } from '@storybook/react';

addParameters({
  backgrounds: [
    { name: 'Alabaster', value: '#f9f8f8', default: true },
    { name: 'Charcoal', value: '#1c1c1c' },
    { name: 'Viking tint', value: '#21d0d9' }
  ]
});

import { configure } from '@storybook/react';

import '../lib/all.scss';
import './storybook.scss';

const req = require.context('../lib', true, /\.stories\.(js|ts)$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
