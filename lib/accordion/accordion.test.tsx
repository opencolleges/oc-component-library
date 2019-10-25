import React from 'react';

import Accordion from './accordion';

import { NAMESPACE } from '../utilities/ts/constants';

import { mount } from 'enzyme';

let wrapper;

describe(`<Accordion />`, () => {
  beforeEach(() => {
    wrapper = mount(
      <Accordion label="foo">
        <p>Bar</p>
      </Accordion>
    );
  });

  it(`Handles props.children`, () => {
    expect(
      wrapper.find(`.${NAMESPACE}-accordion__outer`).children().length
    ).toBe(1);
    expect(wrapper.find(`p`).text()).toBe(`Bar`);

    wrapper.unmount();

    wrapper = mount(
      <Accordion label="foo">
        <h3>Bar</h3>
        <p>Baz</p>
      </Accordion>
    );

    expect(
      wrapper.find(`.${NAMESPACE}-accordion__outer`).children().length
    ).toBe(2);
    expect(wrapper.find(`h3`).text()).toBe(`Bar`);
    expect(wrapper.find(`p`).text()).toBe(`Baz`);
  });

  it(`Handles props.className`, () => {
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-accordion`
    );

    wrapper.setProps({ className: `foo` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-accordion foo`
    );

    wrapper.setProps({ className: `foo bar` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-accordion foo bar`
    );
  });

  it(`Handles props.expanded`, () => {
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-accordion`
    );
    wrapper.unmount();

    wrapper = mount(
      <Accordion label="foo" expanded={true}>
        <p>Bar</p>
      </Accordion>
    );
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-accordion active`
    );

    wrapper.unmount();

    wrapper = mount(
      <Accordion label="foo" expanded={false}>
        <p>Bar</p>
      </Accordion>
    );
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-accordion`
    );
  });

  it(`Handles props.label`, () => {
    expect(wrapper.find(`button`).text()).toBe(`foo`);

    wrapper.setProps({ label: `bar` });
    expect(wrapper.find(`button`).text()).toBe(`bar`);

    wrapper.setProps({ label: `baz` });
    expect(wrapper.find(`button`).text()).toBe(`baz`);
  });

  it(`Handles props.modifiers`, () => {
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-accordion`
    );

    wrapper.setProps({ modifiers: `compact` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-accordion ${NAMESPACE}-accordion--compact`
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

  it(`Handles state.expanded`, () => {
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-accordion`
    );

    wrapper.setState({ expanded: true });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-accordion active`
    );

    wrapper.setState({ expanded: false });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-accordion`
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });
});
