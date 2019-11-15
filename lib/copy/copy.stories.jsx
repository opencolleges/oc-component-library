import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import {
  array,
  text,
  optionsKnob as options,
  withKnobs
} from '@storybook/addon-knobs';
import React from 'react';
import Copy from './copy';
import Uniform from '../uniform';
import UNIFORM_STYLES from '../../.storybook/storybook';

const paragraphChildren = [
  `Paragraph`,
  [`Before taking this assessment, you should...`],
  `+`
];
const paragraphAlignment = [
  `Alignment`,
  { Left: `left`, Center: `center`, Right: `right`, Justify: `justify` },
  `left`,
  { display: `inline-radio` }
];
const anchorHref = [`Link`, `https://www.example.com`];
const anchorChildren = [`Anchor`, `Click me`];
const blockquoteChildren = [`Blockquote`, `Be all you can be...`];
const codeChildren = [`Code`, `this.amazify()`];
const subChildren = [`Subscript`, `22`];
const supChildren = [`Superscript`, `22`];
const preChildren = [`Preformatted`, `const MEATBALL = pork_mince;`];
const listTag = [
  `List type`,
  { ol: `ol`, ul: `ul` },
  `ul`,
  { display: `inline-radio` }
];
const listItems = [`Items`, [`red`, `green`, `blue.`], `+`];
const emChildren = [`Emphasis`, `Certificate IV in Web Technologies`];
const strongChildren = [`Strong`, `ICT40315`];
const kbdChildren = [`Keyboard`, `⌘ Command + Shift + 3`];
const abbrChildren = [`Abbreviation`, `RPL`];
const smallChildren = [`Small`, `The fine print...`];
const markChildren = [
  `Mark`,
  `Highlighted so that I recall this in my learning materials.`
];

const stories = storiesOf(`Copy`, module);

stories.addDecorator(withA11y).addDecorator(withKnobs);

stories
  .add(`Paragaph`, () => {
    const children = array(...paragraphChildren);
    const alignment = options(...paragraphAlignment);

    return (
      <Copy style={{ ...UNIFORM_STYLES, width: `50%` }}>
        <Copy>
          {children.length ? (
            children.map((child, index) => (
              <Copy key={index} modifiers={`p--${alignment}`}>
                {child}
              </Copy>
            ))
          ) : (
            <Copy>Add multiple paragraphs using the + symbol.</Copy>
          )}
        </Copy>
      </Copy>
    );
  })
  .add(`Anchor`, () => {
    const href = text(...anchorHref);
    const children = text(...anchorChildren);

    return (
      <Uniform style={{ ...UNIFORM_STYLES, maxWidth: `50%` }}>
        <Copy tag="a" href={href}>
          {children ? children : `Add anchor`}
        </Copy>
      </Uniform>
    );
  })
  .add(`Blockquote`, () => {
    const children = text(...blockquoteChildren);

    return (
      <Uniform style={{ ...UNIFORM_STYLES, maxWidth: `50%` }}>
        <Copy tag="blockquote">{children ? children : `Add blockquote`}</Copy>
      </Uniform>
    );
  })
  .add(`Code`, () => {
    const children = text(...codeChildren);

    return (
      <Uniform style={{ ...UNIFORM_STYLES, maxWidth: `50%` }}>
        <Copy tag="code">{children ? children : `Add code`}</Copy>
      </Uniform>
    );
  })
  .add(`Subscript`, () => {
    const children = text(...subChildren);

    return (
      <Uniform style={{ ...UNIFORM_STYLES, maxWidth: `50%` }}>
        <Copy tag="sub">{children ? children : `Add subscript`}</Copy>
      </Uniform>
    );
  })
  .add(`Superscript`, () => {
    const children = text(...supChildren);

    return (
      <Uniform style={{ ...UNIFORM_STYLES, maxWidth: `50%` }}>
        <Copy tag="sup">{children ? children : `Add superscript`}</Copy>
      </Uniform>
    );
  })
  .add(`Preformatted`, () => {
    const children = text(...preChildren);

    return (
      <Uniform style={{ ...UNIFORM_STYLES, width: `50%` }}>
        <Copy tag="pre">{children ? children : `Add Preformatted`}</Copy>
      </Uniform>
    );
  })
  .add(`List`, () => {
    const tag = options(...listTag);
    const items = array(...listItems);

    return (
      <Copy style={{ ...UNIFORM_STYLES, width: `50%` }}>
        <Copy tag={tag}>
          {items.length ? (
            items.map((item, index) => (
              <Copy key={index} tag="li">
                {item}
              </Copy>
            ))
          ) : (
            <Copy tag="li">Add multiple items using the + symbol.</Copy>
          )}
        </Copy>
      </Copy>
    );
  })
  .add(`Emphasis`, () => {
    const children = text(...emChildren);

    return (
      <Uniform style={{ ...UNIFORM_STYLES, maxWidth: `50%` }}>
        <Copy tag="em">{children ? children : `Add emphasis`}</Copy>
      </Uniform>
    );
  })
  .add(`Strong`, () => {
    const children = text(...strongChildren);

    return (
      <Uniform style={{ ...UNIFORM_STYLES, maxWidth: `50%` }}>
        <Copy tag="strong">{children ? children : `Add strong`}</Copy>
      </Uniform>
    );
  })
  .add(`Keyboard`, () => {
    const children = text(...kbdChildren);

    return (
      <Uniform style={{ ...UNIFORM_STYLES, maxWidth: `50%` }}>
        <Copy tag="kbd">{children ? children : `Add keyboard`}</Copy>
      </Uniform>
    );
  })
  .add(`Abbreviation`, () => {
    const children = text(...abbrChildren);

    return (
      <Uniform style={{ ...UNIFORM_STYLES, maxWidth: `50%` }}>
        <Copy tag="abbr">{children ? children : `Add abbreviation`}</Copy>
      </Uniform>
    );
  })
  .add(`Small`, () => {
    const children = text(...smallChildren);

    return (
      <Uniform style={{ ...UNIFORM_STYLES, maxWidth: `50%` }}>
        <Copy tag="small">{children ? children : `Add small`}</Copy>
      </Uniform>
    );
  })
  .add(`Mark`, () => {
    const children = text(...markChildren);

    return (
      <Uniform style={{ ...UNIFORM_STYLES, maxWidth: `50%` }}>
        <Copy tag="mark">{children ? children : `Add mark`}</Copy>
      </Uniform>
    );
  });
