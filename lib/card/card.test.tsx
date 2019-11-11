import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { NAMESPACE } from '../utilities/ts/constants';
import Card from './card';

let wrapper: ReactWrapper = null;

describe(`<Card />`, () => {
  beforeEach(() => {
    wrapper = mount(
      <Card>
        <h1 />
      </Card>
    );
  });

  it(`Handles props.children`, () => {
    expect(wrapper.html()).toBe(
      `<div class="${NAMESPACE}-card"><h1></h1></div>`
    );

    wrapper.setProps({ children: <h2 /> });
    expect(wrapper.html()).toBe(
      `<div class="${NAMESPACE}-card"><h2></h2></div>`
    );

    wrapper.setProps({ children: <p /> });
    expect(wrapper.html()).toBe(`<div class="${NAMESPACE}-card"><p></p></div>`);
  });

  it(`Handles props.className`, () => {
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-card`
    );

    wrapper.setProps({ className: `foo` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-card foo`
    );

    wrapper.setProps({ className: `foo bar` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-card foo bar`
    );
  });

  it(`Handles props.href`, () => {
    expect(wrapper.getDOMNode().getAttribute(`href`)).toBe(null);

    wrapper.setProps({ href: `#`, tabIndex: false });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-card ${NAMESPACE}-card--clickable`
    );
    expect(wrapper.getDOMNode().getAttribute(`href`)).toBe(`#`);
    expect(wrapper.getDOMNode().getAttribute(`tabIndex`)).toBe(null);

    wrapper.setProps({ href: `https://www.example.com`, tabIndex: true });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-card ${NAMESPACE}-card--clickable`
    );
    expect(wrapper.getDOMNode().getAttribute(`href`)).toBe(
      `https://www.example.com`
    );
    expect(wrapper.getDOMNode().getAttribute(`tabIndex`)).toBe(`0`);
  });

  it(`Handles props.modifiers`, () => {
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-card`
    );

    wrapper.setProps({ modifiers: `s` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-card ${NAMESPACE}-card--s`
    );

    wrapper.setProps({ modifiers: `m` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-card ${NAMESPACE}-card--m`
    );

    wrapper.setProps({ modifiers: `l` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-card ${NAMESPACE}-card--l`
    );
  });

  it(`Handles props.style`, () => {
    expect(wrapper.getDOMNode().getAttribute(`style`)).toBe(null);

    wrapper.setProps({ style: { zIndex: `1` } });
    expect(wrapper.getDOMNode().getAttribute(`style`)).toBe(`z-index: 1;`);

    wrapper.setProps({ style: { zIndex: `1`, opacity: 0 } });
    expect(wrapper.getDOMNode().getAttribute(`style`)).toBe(
      `z-index: 1; opacity: 0;`
    );
  });

  it(`Handles props.tabIndex`, () => {
    expect(wrapper.getDOMNode().getAttribute(`tabIndex`)).toBe(null);

    wrapper.setProps({ modifiers: `clickable` });
    expect(wrapper.getDOMNode().getAttribute(`tabIndex`)).toBe(`0`);

    wrapper.setProps({ modifiers: `draggable` });
    expect(wrapper.getDOMNode().getAttribute(`tabIndex`)).toBe(`0`);

    wrapper.setProps({ modifiers: `clickable`, tabIndex: false });
    expect(wrapper.getDOMNode().getAttribute(`tabIndex`)).toBe(null);

    wrapper.setProps({ modifiers: `draggable`, tabIndex: false });
    expect(wrapper.getDOMNode().getAttribute(`tabIndex`)).toBe(null);
  });

  afterEach(() => {
    wrapper.unmount();
  });
});
