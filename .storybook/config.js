import { configure } from '@storybook/react';

import '../lib/all.scss';

const req = require.context('../lib', true, /\.stories\.(js|ts)$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
