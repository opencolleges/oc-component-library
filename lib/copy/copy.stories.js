import React from 'react';

import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import {
  array,
  text,
  optionsKnob as options,
  withKnobs
} from '@storybook/addon-knobs';

import OCUniform from '../uniform';
import OCCopy from './copy';

import uniformStyles from '../../.storybook/storybook';

const paragraphChildren = [
  'Paragraph',
  ['Before taking this assessment, you should...'],
  '+'
];
const paragraphAlignment = [
  'Alignment',
  { Left: 'left', Center: 'center', Right: 'right', Justify: 'justify' },
  'left',
  { display: 'inline-radio' }
];
const anchorHref = ['Link', 'https://www.example.com'];
const anchorChildren = ['Anchor', 'Click me'];
const blockquoteChildren = ['Blockquote', 'Be all you can be...'];
const codeChildren = ['Code', 'this.amazify()'];
const subChildren = ['Subscript', '22'];
const supChildren = ['Superscript', '22'];
const preChildren = ['Preformatted', 'const MEATBALL = pork_mince;'];
const listTag = [
  'List type',
  { ol: 'ol', ul: 'ul' },
  'ul',
  { display: 'inline-radio' }
];
const listItems = ['Items', ['red', 'green', 'blue.'], '+'];
const emChildren = ['Emphasis', 'Certificate IV in Web Technologies'];
const strongChildren = ['Strong', 'ICT40315'];
const kbdChildren = ['Keyboard', '⌘ Command + Shift + 3'];
const abbrChildren = ['Abbreviation', 'RPL'];
const smallChildren = ['Small', 'The fine print...'];
const markChildren = [
  'Mark',
  'Highlighted so that I recall this in my learning materials.'
];

const stories = storiesOf('Copy', module);

stories.addDecorator(withA11y).addDecorator(withKnobs);

stories
  .add('Paragaph', () => {
    const children = array(...paragraphChildren);
    const alignment = options(...paragraphAlignment);

    return (
      <OCCopy style={{ ...uniformStyles, width: '50%' }}>
        <OCCopy>
          {children.length ? (
            children.map((child, index) => (
              <OCCopy key={index} modifiers={`p--${alignment}`}>
                {child}
              </OCCopy>
            ))
          ) : (
            <OCCopy>Add multiple paragraphs using the + symbol.</OCCopy>
          )}
        </OCCopy>
      </OCCopy>
    );
  })
  .add('Anchor', () => {
    const href = text(...anchorHref);
    const children = text(...anchorChildren);

    return (
      <OCUniform style={{ ...uniformStyles, maxWidth: '50%' }}>
        <OCCopy tag="a" href={href}>
          {children ? children : 'Add anchor'}
        </OCCopy>
      </OCUniform>
    );
  })
  .add('Blockquote', () => {
    const children = text(...blockquoteChildren);

    return (
      <OCUniform style={{ ...uniformStyles, maxWidth: '50%' }}>
        <OCCopy tag="blockquote">
          {children ? children : 'Add blockquote'}
        </OCCopy>
      </OCUniform>
    );
  })
  .add('Code', () => {
    const children = text(...codeChildren);

    return (
      <OCUniform style={{ ...uniformStyles, maxWidth: '50%' }}>
        <OCCopy tag="code">{children ? children : 'Add code'}</OCCopy>
      </OCUniform>
    );
  })
  .add('Subscript', () => {
    const children = text(...subChildren);

    return (
      <OCUniform style={{ ...uniformStyles, maxWidth: '50%' }}>
        <OCCopy tag="sub">{children ? children : 'Add subscript'}</OCCopy>
      </OCUniform>
    );
  })
  .add('Superscript', () => {
    const children = text(...supChildren);

    return (
      <OCUniform style={{ ...uniformStyles, maxWidth: '50%' }}>
        <OCCopy tag="sup">{children ? children : 'Add superscript'}</OCCopy>
      </OCUniform>
    );
  })
  .add('Preformatted', () => {
    const children = text(...preChildren);

    return (
      <OCUniform style={{ ...uniformStyles, width: '50%' }}>
        <OCCopy tag="pre">{children ? children : 'Add Preformatted'}</OCCopy>
      </OCUniform>
    );
  })
  .add('List', () => {
    const tag = options(...listTag);
    const items = array(...listItems);

    return (
      <OCCopy style={{ ...uniformStyles, width: '50%' }}>
        <OCCopy tag={tag}>
          {items.length ? (
            items.map((item, index) => (
              <OCCopy key={index} tag="li">
                {item}
              </OCCopy>
            ))
          ) : (
            <OCCopy tag="li">Add multiple items using the + symbol.</OCCopy>
          )}
        </OCCopy>
      </OCCopy>
    );
  })
  .add('Emphasis', () => {
    const children = text(...emChildren);

    return (
      <OCUniform style={{ ...uniformStyles, maxWidth: '50%' }}>
        <OCCopy tag="em">{children ? children : 'Add emphasis'}</OCCopy>
      </OCUniform>
    );
  })
  .add('Strong', () => {
    const children = text(...strongChildren);

    return (
      <OCUniform style={{ ...uniformStyles, maxWidth: '50%' }}>
        <OCCopy tag="strong">{children ? children : 'Add strong'}</OCCopy>
      </OCUniform>
    );
  })
  .add('Keyboard', () => {
    const children = text(...kbdChildren);

    return (
      <OCUniform style={{ ...uniformStyles, maxWidth: '50%' }}>
        <OCCopy tag="kbd">{children ? children : 'Add keyboard'}</OCCopy>
      </OCUniform>
    );
  })
  .add('Abbreviation', () => {
    const children = text(...abbrChildren);

    return (
      <OCUniform style={{ ...uniformStyles, maxWidth: '50%' }}>
        <OCCopy tag="abbr">{children ? children : 'Add abbreviation'}</OCCopy>
      </OCUniform>
    );
  })
  .add('Small', () => {
    const children = text(...smallChildren);

    return (
      <OCUniform style={{ ...uniformStyles, maxWidth: '50%' }}>
        <OCCopy tag="small">{children ? children : 'Add small'}</OCCopy>
      </OCUniform>
    );
  })
  .add('Mark', () => {
    const children = text(...markChildren);

    return (
      <OCUniform style={{ ...uniformStyles, maxWidth: '50%' }}>
        <OCCopy tag="mark">{children ? children : 'Add mark'}</OCCopy>
      </OCUniform>
    );
  });
