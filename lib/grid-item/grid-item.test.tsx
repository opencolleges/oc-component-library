import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { NAMESPACE } from '../utilities/ts/constants';
import GridItem from './grid-item';

let wrapper: ReactWrapper = null;

describe(`<GridItem />`, () => {
  beforeEach(() => {
    wrapper = mount(<GridItem>Foo</GridItem>);
  });

  it(`Handles props.children`, () => {
    expect(wrapper.text()).toBe(`Foo`);

    wrapper.setProps({ children: `Bar` });
    expect(wrapper.text()).toBe(`Bar`);

    wrapper.setProps({ children: `Baz` });
    expect(wrapper.text()).toBe(`Baz`);
  });

  it(`Handles props.className`, () => {
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-grid__item`
    );

    wrapper.setProps({ className: `bar` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-grid__item bar`
    );

    wrapper.setProps({ className: `bar baz` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-grid__item bar baz`
    );
  });

  it(`Handles props.modifiers`, () => {
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-grid__item`
    );

    wrapper.setProps({ modifiers: `s-12` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-grid__item ${NAMESPACE}-grid__item--s-12`
    );

    wrapper.setProps({ modifiers: `m-6` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-grid__item ${NAMESPACE}-grid__item--m-6`
    );

    wrapper.setProps({ modifiers: `l-4` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-grid__item ${NAMESPACE}-grid__item--l-4`
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

  it(`Handles props.tag`, () => {
    expect(wrapper.getDOMNode().nodeName).toBe(`DIV`);

    wrapper.setProps({ tag: `section` });
    expect(wrapper.getDOMNode().nodeName).toBe(`SECTION`);

    wrapper.setProps({ tag: `div` });
    expect(wrapper.getDOMNode().nodeName).toBe(`DIV`);
  });

  afterEach(() => {
    wrapper.unmount();
  });
});
