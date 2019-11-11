import { mount } from 'enzyme';
import React from 'react';
import { NAMESPACE } from '../utilities/ts/constants';
import Toaster from './toaster';

let wrapper;

describe(`<Toaster />`, () => {
  beforeEach(() => {
    wrapper = mount(<Toaster />);
  });

  it(`Handles props.className`, () => {
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-toaster`
    );

    wrapper.setProps({ className: `foo` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-toaster foo`
    );

    wrapper.setProps({ className: `foo bar` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-toaster foo bar`
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

  it(`Handles props.toasts`, done => {
    expect(wrapper.find(`.${NAMESPACE}-toast`).length).toBe(0);

    wrapper.setProps({
      toasts: [{ heading: `baz`, message: `qui`, modifiers: `error` }]
    });
    wrapper.update();

    expect(wrapper.find(`.${NAMESPACE}-toast`).length).toBe(1);

    wrapper.setProps({
      toasts: [
        {
          heading: `thud`,
          message: `corge`,
          modifiers: `error`
        }
      ]
    });
    wrapper.update();

    expect(wrapper.find(`.${NAMESPACE}-toast`).length).toBe(2);

    wrapper.setProps({
      toasts: [{ duration: 1000, heading: `foo`, message: `bar` }]
    });
    wrapper.update();

    expect(wrapper.find(`.${NAMESPACE}-toast`).length).toBe(3);

    setTimeout(() => {
      wrapper.update();

      expect(wrapper.find(`.${NAMESPACE}-toast`).length).toBe(2);
      done();
    }, 2000);
  });

  afterEach(() => {
    wrapper.unmount();
  });
});
