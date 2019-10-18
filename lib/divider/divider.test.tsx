import React from 'react';

import Divider from './divider';

import { NAMESPACE } from '../utilities/ts/constants';

import { mount } from 'enzyme';

let wrapper;

describe(`<Divider />`, () => {
  beforeEach(() => {
    wrapper = mount(<Divider />);
  });

  it(`Handles props.modifiers`, () => {
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-divider ${NAMESPACE}-divider--s`
    );

    wrapper.setProps({ modifiers: `m` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-divider ${NAMESPACE}-divider--m`
    );

    wrapper.setProps({ modifiers: `l` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-divider ${NAMESPACE}-divider--l`
    );
  });

  it(`Handles props.className`, () => {
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-divider ${NAMESPACE}-divider--s`
    );

    wrapper.setProps({ className: `foo` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-divider ${NAMESPACE}-divider--s foo`
    );

    wrapper.setProps({ className: `bar` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-divider ${NAMESPACE}-divider--s bar`
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

  afterEach(() => {
    wrapper.unmount();
  });
});
