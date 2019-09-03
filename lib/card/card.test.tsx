import * as React from 'react';

import Card from './card';

import { mount } from 'enzyme';

let wrapper;

describe('<Card />', () => {
  beforeEach(() => {
    wrapper = mount(
      <Card>
        <h1 />
      </Card>
    );
  });

  it('Handles props.children', () => {
    expect(wrapper.html()).toBe('<div class="oc-card"><h1></h1></div>');

    wrapper.setProps({ children: <h2 /> });
    expect(wrapper.html()).toBe('<div class="oc-card"><h2></h2></div>');

    wrapper.setProps({ children: <p /> });
    expect(wrapper.html()).toBe('<div class="oc-card"><p></p></div>');
  });

  it('Handles props.className', () => {
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-card');

    wrapper.setProps({ className: 'foo' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-card foo');

    wrapper.setProps({ className: 'foo bar' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-card foo bar');
  });

  it('Handles props.href', () => {
    expect(wrapper.getDOMNode().getAttribute('href')).toBe(null);

    wrapper.setProps({ href: '#', tabIndex: false });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-card oc-card--clickable'
    );
    expect(wrapper.getDOMNode().getAttribute('href')).toBe('#');
    expect(wrapper.getDOMNode().getAttribute('tabIndex')).toBe(null);

    wrapper.setProps({ href: 'https://www.example.com', tabIndex: true });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-card oc-card--clickable'
    );
    expect(wrapper.getDOMNode().getAttribute('href')).toBe(
      'https://www.example.com'
    );
    expect(wrapper.getDOMNode().getAttribute('tabIndex')).toBe('0');
  });

  it('Handles props.modifiers', () => {
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-card');

    wrapper.setProps({ modifiers: 'card--s' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-card oc-card--s'
    );

    wrapper.setProps({ modifiers: 'card--m' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-card oc-card--m'
    );

    wrapper.setProps({ modifiers: 'card--l' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-card oc-card--l'
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

  it('Handles props.tabIndex', () => {
    expect(wrapper.getDOMNode().getAttribute('tabIndex')).toBe(null);

    wrapper.setProps({ modifiers: 'card--clickable' });
    expect(wrapper.getDOMNode().getAttribute('tabIndex')).toBe('0');

    wrapper.setProps({ modifiers: 'card--draggable' });
    expect(wrapper.getDOMNode().getAttribute('tabIndex')).toBe('0');

    wrapper.setProps({ modifiers: 'card--clickable', tabIndex: false });
    expect(wrapper.getDOMNode().getAttribute('tabIndex')).toBe(null);

    wrapper.setProps({ modifiers: 'card--draggable', tabIndex: false });
    expect(wrapper.getDOMNode().getAttribute('tabIndex')).toBe(null);
  });

  afterEach(() => {
    wrapper.unmount();
  });
});
