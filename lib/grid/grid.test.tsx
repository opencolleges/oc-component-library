import React from 'react';

import Grid from './grid';

import { mount } from 'enzyme';

let wrapper;

describe('<Grid />', () => {
  beforeEach(() => {
    wrapper = mount(<Grid>Foo</Grid>);
  });

  it('Handles props.children', () => {
    expect(wrapper.text()).toBe('Foo');

    wrapper.setProps({ children: 'Bar' });
    expect(wrapper.text()).toBe('Bar');

    wrapper.setProps({ children: 'Baz' });
    expect(wrapper.text()).toBe('Baz');
  });

  it('Handles props.className', () => {
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-grid');

    wrapper.setProps({ className: 'bar' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-grid bar');

    wrapper.setProps({ className: 'bar baz' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-grid bar baz');
  });

  it('Handles props.maxWidth', () => {
    expect(wrapper.getDOMNode().getAttribute('style')).toBe(null);

    wrapper.setProps({ maxWidth: false });
    expect(wrapper.getDOMNode().getAttribute('style')).toBe('max-width: 100%;');

    wrapper.setProps({ maxWidth: true });
    expect(wrapper.getDOMNode().getAttribute('style')).toBe('');
  });

  it('Handles props.modifiers', () => {
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-grid');

    wrapper.setProps({ modifiers: 'gutter-fixed' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-grid oc-grid--gutter-fixed'
    );

    wrapper.setProps({ modifiers: 'gutter-x-fixed' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-grid oc-grid--gutter-x-fixed'
    );

    wrapper.setProps({ modifiers: 'gutter-y-fixed' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-grid oc-grid--gutter-y-fixed'
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

  it('Handles props.tag', () => {
    expect(wrapper.getDOMNode().nodeName).toBe('DIV');

    wrapper.setProps({ tag: 'section' });
    expect(wrapper.getDOMNode().nodeName).toBe('SECTION');

    wrapper.setProps({ tag: 'div' });
    expect(wrapper.getDOMNode().nodeName).toBe('DIV');
  });

  afterEach(() => {
    wrapper.unmount();
  });
});
