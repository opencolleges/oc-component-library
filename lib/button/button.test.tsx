import React from 'react';

import Button from './button';

import { NAMESPACE } from '../utilities/ts/constants';

import { mount } from 'enzyme';

let wrapper;

describe(`<Button />`, () => {
  beforeEach(() => {
    wrapper = mount(<Button label="Foo" />);
  });

  it(`Handles props.className`, () => {
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-button ${NAMESPACE}-button--primary`
    );

    wrapper.setProps({ className: `qux` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-button ${NAMESPACE}-button--primary qux`
    );

    wrapper.setProps({ className: `qux corge` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-button ${NAMESPACE}-button--primary qux corge`
    );
  });

  it(`Handles props.disabled`, () => {
    expect(wrapper.getDOMNode().getAttribute(`disabled`)).toBe(null);

    wrapper.setProps({ disabled: true });
    expect(wrapper.getDOMNode().getAttribute(`disabled`)).toBe(``);

    wrapper.setProps({ disabled: false });
    expect(wrapper.getDOMNode().getAttribute(`disabled`)).toBe(null);
  });

  it(`Handles props.href`, () => {
    expect(wrapper.getDOMNode().nodeName).toBe(`BUTTON`);
    expect(wrapper.getDOMNode().getAttribute(`href`)).toBe(null);

    wrapper.setProps({ href: `https://www.example.com` });
    expect(wrapper.getDOMNode().nodeName).toBe(`A`);
    expect(wrapper.getDOMNode().getAttribute(`href`)).toBe(
      `https://www.example.com`
    );

    wrapper.setProps({ href: undefined });
    expect(wrapper.getDOMNode().nodeName).toBe(`BUTTON`);
    expect(wrapper.getDOMNode().getAttribute(`href`)).toBe(null);
  });

  it(`Handles props.icon`, () => {
    expect(wrapper.find(`svg`).length).toBe(0);

    wrapper.setProps({ icon: `tick` });
    expect(wrapper.find(`svg`).length).toBe(1);
    expect(
      wrapper
        .find(`svg`)
        .getDOMNode()
        .getAttribute(`class`)
    ).toBe(`${NAMESPACE}-icon ${NAMESPACE}-icon--tick active`);

    wrapper.setProps({ icon: `arrow-down` });
    expect(
      wrapper
        .find(`svg`)
        .getDOMNode()
        .getAttribute(`class`)
    ).toBe(`${NAMESPACE}-icon ${NAMESPACE}-icon--arrow-down active`);

    wrapper.setProps({ icon: undefined });
    expect(wrapper.find(`svg`).length).toBe(0);
  });

  it(`Handles props.id`, () => {
    expect(wrapper.getDOMNode().getAttribute(`id`)).toBe(null);

    wrapper.setProps({ id: `bar` });
    expect(wrapper.getDOMNode().getAttribute(`id`)).toBe(`bar`);

    wrapper.setProps({ id: `baz` });
    expect(wrapper.getDOMNode().getAttribute(`id`)).toBe(`baz`);
  });

  it(`Handles props.label`, () => {
    expect(wrapper.text()).toBe(`Foo`);

    wrapper.setProps({ label: `Bar` });
    expect(wrapper.text()).toBe(`Bar`);

    wrapper.setProps({ label: `Baz` });
    expect(wrapper.text()).toBe(`Baz`);
  });

  it(`Handles props.modifiers`, () => {
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-button ${NAMESPACE}-button--primary`
    );

    wrapper.setProps({ modifiers: `compact secondary` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-button ${NAMESPACE}-button--compact ${NAMESPACE}-button--secondary`
    );

    wrapper.setProps({ modifiers: `primary reversed` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-button ${NAMESPACE}-button--primary ${NAMESPACE}-button--reversed`
    );
  });

  it(`Handles props.name`, () => {
    expect(wrapper.getDOMNode().getAttribute(`name`)).toBe(null);

    wrapper.setProps({ name: `bar` });
    expect(wrapper.getDOMNode().getAttribute(`name`)).toBe(`bar`);

    wrapper.setProps({ name: `baz` });
    expect(wrapper.getDOMNode().getAttribute(`name`)).toBe(`baz`);
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

  it(`Handles props.type`, () => {
    expect(wrapper.getDOMNode().getAttribute(`type`)).toBe(`button`);

    wrapper.setProps({ type: `reset` });
    expect(wrapper.getDOMNode().getAttribute(`type`)).toBe(`reset`);

    wrapper.setProps({ href: `https://www.example.com` });
    expect(wrapper.getDOMNode().getAttribute(`type`)).toBe(null);
  });

  afterEach(() => {
    wrapper.unmount();
  });
});
