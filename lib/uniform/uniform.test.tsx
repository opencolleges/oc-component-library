import * as React from 'react';

import Uniform from './uniform';

import uniform from './utilities/uniform';

import { mount } from 'enzyme';

let wrapper;

describe('<Uniform />', () => {
  it('Handles props.tag', () => {
    wrapper = mount(<Uniform>Foo</Uniform>);

    expect(wrapper.getDOMNode().nodeName).toBe('MAIN');

    wrapper.setProps({ tag: 'div' });
    expect(wrapper.getDOMNode().nodeName).toBe('DIV');

    wrapper.setProps({ tag: 'section' });
    expect(wrapper.getDOMNode().nodeName).toBe('SECTION');
  });

  it('Handles props.mode', () => {
    uniform.hasMouse = jest.fn().mockReturnValue(false);
    uniform.getMode = jest.fn().mockReturnValue('light');

    wrapper = mount(<Uniform>Foo</Uniform>);
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-light');

    uniform.getMode = jest.fn().mockReturnValue('dark');

    wrapper.unmount();
    wrapper = mount(<Uniform>Foo</Uniform>);

    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-dark');

    wrapper.setProps({ mode: 'bar' });

    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-bar');
  });

  it('Handles no-touchevents', () => {
    uniform.hasMouse = jest.fn().mockReturnValue(false);

    wrapper = mount(<Uniform mode=" ">Foo</Uniform>);

    expect(wrapper.getDOMNode().getAttribute('class')).toBe('');

    uniform.hasMouse = jest.fn().mockReturnValue(true);

    wrapper.unmount();
    wrapper = mount(<Uniform mode=" ">Foo</Uniform>);

    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-no-touchevents'
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });
});
