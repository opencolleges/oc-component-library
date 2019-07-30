import * as React from 'react';

import Badge from './badge';

import { mount } from 'enzyme';

describe(`<Badge />`, () => {
  let badge;
  beforeEach(() => {
    badge = mount(<Badge />);
  });

  afterEach(() => {
    badge.unmount();
  });

  it(`Handles props.modifiers`, () => {
    expect(badge.getDOMNode().getAttribute(`class`)).toBe(`oc-badge`);

    badge.setProps({ modifiers: `badge--error` });
    expect(badge.getDOMNode().getAttribute(`class`)).toBe(
      `oc-badge oc-badge--error`
    );

    badge.setProps({ modifiers: `badge--success` });
    expect(badge.getDOMNode().getAttribute(`class`)).toBe(
      `oc-badge oc-badge--success`
    );
  });

  it(`Handles props.className`, () => {
    expect(badge.getDOMNode().getAttribute(`class`)).toBe(`oc-badge`);

    badge.setProps({ className: `foo` });
    expect(badge.getDOMNode().getAttribute(`class`)).toBe(`oc-badge foo`);

    badge.setProps({ className: `foo bar` });
    expect(badge.getDOMNode().getAttribute(`class`)).toBe(`oc-badge foo bar`);
  });

  it(`Handles props.style`, () => {
    expect(badge.getDOMNode().getAttribute(`style`)).toBe(null);

    badge.setProps({ style: { zIndex: `1` } });
    expect(badge.getDOMNode().getAttribute(`style`)).toBe(`z-index: 1;`);
  });

  it(`Handles props.value`, () => {
    expect(badge.find(`span`).text()).toBe(`0`);

    badge.setProps({ value: '16 qux' });
    expect(badge.find(`span`).text()).toBe(`16 qux`);

    badge.setProps({ value: '10' });
    expect(badge.find(`span`).text()).toBe(`9+`);

    badge.setProps({ value: 160 });
    expect(badge.find(`span`).text()).toBe(`99+`);
  });
});
