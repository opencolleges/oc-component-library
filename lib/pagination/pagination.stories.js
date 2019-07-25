import React from 'react';

import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { optionsKnob as options, withKnobs } from '@storybook/addon-knobs';

import OCUniform from '../uniform';
import OCPagination from './pagination';

const paginationNumOfPages = [
  'No of pages',
  {
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '10': '10'
  },
  '10',
  { display: 'inline-radio' }
];

const pagination3Pages = [
  {
    number: 1
  },
  {
    number: 2
  },
  {
    number: 3,
    modifiers: 'pagination__item--populated'
  }
];
const pagination4Pages = [
  {
    number: 1
  },
  {
    number: 2
  },
  {
    number: 3,
    modifiers: 'pagination__item--populated'
  },
  {
    number: 4
  }
];
const pagination5Pages = [
  {
    number: 1
  },
  {
    number: 2
  },
  {
    number: 3,
    modifiers: 'pagination__item--populated'
  },
  {
    number: 4
  },
  {
    number: 5,
    modifiers: 'pagination__item--required'
  }
];
const pagination6Pages = [
  {
    number: 1
  },
  {
    number: 2
  },
  {
    number: 3,
    modifiers: 'pagination__item--populated'
  },
  {
    number: 4
  },
  {
    number: 5,
    modifiers: 'pagination__item--required'
  },
  {
    number: 6
  }
];
const pagination7Pages = [
  {
    number: 1
  },
  {
    number: 2
  },
  {
    number: 3,
    modifiers: 'pagination__item--populated'
  },
  {
    number: 4
  },
  {
    number: 5,
    modifiers: 'pagination__item--required'
  },
  {
    number: 6
  },
  {
    number: 7,
    modifiers: 'pagination__item--populated'
  }
];
const pagination8Pages = [
  {
    number: 1
  },
  {
    number: 2
  },
  {
    number: 3,
    modifiers: 'pagination__item--populated'
  },
  {
    number: 4
  },
  {
    number: 5,
    modifiers: 'pagination__item--required'
  },
  {
    number: 6
  },
  {
    number: 7,
    modifiers: 'pagination__item--populated'
  },
  {
    number: 8
  }
];
const pagination9Pages = [
  {
    number: 1
  },
  {
    number: 2
  },
  {
    number: 3,
    modifiers: 'pagination__item--populated'
  },
  {
    number: 4
  },
  {
    number: 5,
    modifiers: 'pagination__item--required'
  },
  {
    number: 6
  },
  {
    number: 7,
    modifiers: 'pagination__item--populated'
  },
  {
    number: 8
  },
  {
    number: 9,
    modifiers: 'pagination__item--populated'
  }
];
const pagination10Pages = [
  {
    number: 1
  },
  {
    number: 2
  },
  {
    number: 3,
    modifiers: 'pagination__item--populated'
  },
  {
    number: 4
  },
  {
    number: 5,
    modifiers: 'pagination__item--required'
  },
  {
    number: 6
  },
  {
    number: 7,
    modifiers: 'pagination__item--populated'
  },
  {
    number: 8
  },
  {
    number: 9,
    modifiers: 'pagination__item--populated'
  },
  {
    number: 10
  }
];

const stories = storiesOf('Pagination', module);

stories.addDecorator(withA11y).addDecorator(withKnobs);

stories.add('Default', () => {
  const numOfPages = options(...paginationNumOfPages);
  const threePages = pagination3Pages;
  const fourPages = pagination4Pages;
  const fivePages = pagination5Pages;
  const sixPages = pagination6Pages;
  const sevenPages = pagination7Pages;
  const eightPages = pagination8Pages;
  const ninePages = pagination9Pages;
  const tenPages = pagination10Pages;

  return (
    <OCUniform>
      {numOfPages === '3' ? (
        <OCPagination key={numOfPages} pages={threePages}></OCPagination>
      ) : numOfPages === '4' ? (
        <OCPagination key={numOfPages} pages={fourPages}></OCPagination>
      ) : numOfPages === '5' ? (
        <OCPagination key={numOfPages} pages={fivePages}></OCPagination>
      ) : numOfPages === '6' ? (
        <OCPagination key={numOfPages} pages={sixPages}></OCPagination>
      ) : numOfPages === '7' ? (
        <OCPagination key={numOfPages} pages={sevenPages}></OCPagination>
      ) : numOfPages === '8' ? (
        <OCPagination key={numOfPages} pages={eightPages}></OCPagination>
      ) : numOfPages === '9' ? (
        <OCPagination key={numOfPages} pages={ninePages}></OCPagination>
      ) : (
        <OCPagination key={numOfPages} pages={tenPages}></OCPagination>
      )}
    </OCUniform>
  );
});
