import * as React from 'react';

import Heading from './heading';

import { mount } from 'enzyme';

let wrapper;

describe('<Heading />', () => {
  beforeEach(() => {
    wrapper = mount(<Heading>foo</Heading>);
  });

  it('Handles props.children', () => {
    expect(wrapper.find('h1').text()).toBe('foo');

    wrapper.setProps({ children: 'bar' });
    expect(wrapper.find('h1').text()).toBe('bar');

    wrapper.setProps({ children: 'baz' });
    expect(wrapper.find('h1').text()).toBe('baz');
  });

  it('Handles props.className', () => {
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-h1');

    wrapper.setProps({ className: 'bar' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-h1 bar');

    wrapper.setProps({ className: 'bar baz' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-h1 bar baz');
  });

  it('Handles props.level', () => {
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-h1');

    wrapper.setProps({ level: 1 });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-h1');

    wrapper.setProps({ level: 2 });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-h2');

    wrapper.setProps({ level: 3 });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-h3');

    wrapper.setProps({ level: 4 });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-h4');

    wrapper.setProps({ level: 5 });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-h5');

    wrapper.setProps({ level: 6 });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-h6');
  });

  it('Handles props.modifiers', () => {
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-h1');

    wrapper.setProps({ modifiers: 'h1--compact' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-h1 oc-h1--compact'
    );

    wrapper.setProps({ modifiers: 'h1--center' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-h1 oc-h1--center'
    );

    wrapper.setProps({ modifiers: 'h1--right' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-h1 oc-h1--right'
    );
  });

  it('Handles props.style', () => {
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
