import * as React from 'react';

import Uniform from './uniform';

import uniform from './utilities/uniform';

import { mount } from 'enzyme';

let wrapper;

describe('<Uniform />', () => {
  it('Handles no-touchevents', () => {
    uniform.getMode = jest.fn().mockReturnValue('light');
    uniform.hasMouse = jest.fn().mockReturnValue(false);

    wrapper = mount(<Uniform>foo</Uniform>);

    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-light');

    uniform.hasMouse = jest.fn().mockReturnValue(true);

    wrapper.unmount();
    wrapper = mount(<Uniform>foo</Uniform>);

    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-light oc-no-touchevents'
    );
  });

  it('Handles props.tag', () => {
    wrapper = mount(<Uniform>foo</Uniform>);

    expect(wrapper.getDOMNode().nodeName).toBe('MAIN');

    wrapper.setProps({ tag: 'div' });
    expect(wrapper.getDOMNode().nodeName).toBe('DIV');

    wrapper.setProps({ tag: 'section' });
    expect(wrapper.getDOMNode().nodeName).toBe('SECTION');
  });

  it('Handles props.mode', () => {
    uniform.hasMouse = jest.fn().mockReturnValue(false);
    uniform.getMode = jest.fn().mockReturnValue('light');

    wrapper = mount(<Uniform>foo</Uniform>);
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-light');

    uniform.getMode = jest.fn().mockReturnValue('dark');

    wrapper.unmount();
    wrapper = mount(<Uniform>foo</Uniform>);

    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-dark');

    wrapper.setProps({ mode: 'bar' });

    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-bar');
  });

  it('Handles props.className', () => {
    uniform.hasMouse = jest.fn().mockReturnValue(false);
    uniform.getMode = jest.fn().mockReturnValue('light');

    wrapper = mount(<Uniform>foo</Uniform>);

    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-light');

    wrapper.setProps({ className: 'bar' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-light bar');

    wrapper.setProps({ className: 'bar baz' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-light bar baz');
  });

  it('Handles props.style', () => {
    wrapper = mount(<Uniform>foo</Uniform>);

    expect(wrapper.getDOMNode().getAttribute('style')).toBe(null);

    wrapper.setProps({ style: { zIndex: '1' } });
    expect(wrapper.getDOMNode().getAttribute('style')).toBe('z-index: 1;');

    wrapper.setProps({ style: { zIndex: '1', opacity: 0 } });
    expect(wrapper.getDOMNode().getAttribute('style')).toBe(
      'z-index: 1; opacity: 0;'
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });
});
