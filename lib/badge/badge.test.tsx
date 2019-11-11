import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { NAMESPACE } from '../utilities/ts/constants';
import Badge from './badge';

let wrapper: ReactWrapper = null;

describe(`<Badge />`, () => {
  beforeEach(() => {
    wrapper = mount(<Badge />);
  });

  it(`Handles props.className`, () => {
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-badge`
    );

    wrapper.setProps({ className: `foo` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-badge foo`
    );

    wrapper.setProps({ className: `foo bar` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-badge foo bar`
    );
  });

  it(`Handles props.modifiers`, () => {
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-badge`
    );

    wrapper.setProps({ modifiers: `error` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-badge ${NAMESPACE}-badge--error`
    );

    wrapper.setProps({ modifiers: `success` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-badge ${NAMESPACE}-badge--success`
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

  it(`Handles props.value`, () => {
    expect(wrapper.find(`span`).text()).toBe(`0`);

    wrapper.setProps({ value: `16 qux` });
    expect(wrapper.find(`span`).text()).toBe(`16 qux`);

    wrapper.setProps({ value: `10` });
    expect(wrapper.find(`span`).text()).toBe(`9+`);

    wrapper.setProps({ value: 160 });
    expect(wrapper.find(`span`).text()).toBe(`99+`);
  });

  afterEach(() => {
    wrapper.unmount();
  });
});
