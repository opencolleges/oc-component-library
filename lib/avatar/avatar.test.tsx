import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { NAMESPACE } from '../utilities/ts/constants';
import Avatar from './avatar';

let wrapper: ReactWrapper = null;

describe(`<Avatar />`, () => {
  beforeEach(() => {
    wrapper = mount(<Avatar firstName="Foo" sex="male" />);
  });

  it(`Handles props.className`, () => {
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-avatar`
    );

    wrapper.setProps({ className: `qux` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-avatar qux`
    );

    wrapper.setProps({ className: `qux corge` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-avatar qux corge`
    );
  });

  it(`Handles props.firstName`, () => {
    expect(wrapper.getDOMNode().getAttribute(`title`)).toBe(`Foo`);

    wrapper.setProps({ firstName: `Bar` });
    expect(wrapper.getDOMNode().getAttribute(`title`)).toBe(`Bar`);

    wrapper.setProps({ firstName: `Baz` });
    expect(wrapper.getDOMNode().getAttribute(`title`)).toBe(`Baz`);
  });

  it(`Handles props.href`, () => {
    expect(wrapper.find(`a`).length).toBe(0);

    wrapper.setProps({ href: `https://www.example.com` });
    expect(wrapper.find(`a`).length).toBe(1);
    expect(
      wrapper
        .find(`a`)
        .getDOMNode()
        .getAttribute(`href`)
    ).toBe(`https://www.example.com`);

    wrapper.setProps({ href: undefined });
    expect(wrapper.find(`a`).length).toBe(0);
  });

  it(`Handles props.image`, () => {
    return;
  });

  it(`Handles props.modifiers`, () => {
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-avatar`
    );

    wrapper.setProps({ modifiers: `reversed` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-avatar ${NAMESPACE}-avatar--reversed`
    );

    wrapper.setProps({ modifiers: `success` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-avatar ${NAMESPACE}-avatar--success`
    );
  });

  it(`Handles props.sex`, () => {
    expect(
      wrapper
        .find(`.${NAMESPACE}-avatar__image`)
        .getDOMNode()
        .getAttribute(`class`)
    ).toContain(`male`);

    wrapper.setProps({ sex: `female` });
    expect(
      wrapper
        .find(`.${NAMESPACE}-avatar__image`)
        .getDOMNode()
        .getAttribute(`class`)
    ).toContain(`female`);

    // ! Add support:
    // ! wrapper.setProps({ sex: 'undisclosed' });
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
    expect(wrapper.find(`.${NAMESPACE}-badge`).length).toBe(0);

    wrapper.setProps({ modifiers: `m success` });
    expect(wrapper.find(`.${NAMESPACE}-badge`).length).toBe(1);

    expect(wrapper.find(`.${NAMESPACE}-badge`).text()).toBe(`0`);

    wrapper.setProps({ value: 18 });
    expect(wrapper.find(`.${NAMESPACE}-badge`).text()).toBe(`9+`);

    wrapper.setProps({ value: 100 });
    expect(wrapper.find(`.${NAMESPACE}-badge`).text()).toBe(`99+`);

    wrapper.setProps({ modifiers: `s` });
    expect(wrapper.find(`.${NAMESPACE}-badge`).length).toBe(0);
  });

  afterEach(() => {
    wrapper.unmount();
  });
});
