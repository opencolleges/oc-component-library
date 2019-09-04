import * as React from 'react';

import Accordion from './accordion';

import { mount } from 'enzyme';

let wrapper;

describe('<Acordion />', () => {
  beforeEach(() => {
    wrapper = mount(<Accordion />);
  });

  it('Handles props.children', () => {
    // expect(wrapper.find('div').text()).toBe('foo');
    //   wrapper.setProps({ children: 'bar' });
    //   expect(wrapper.find('div').text()).toBe('bar');
    //   wrapper.setProps({ children: 'baz' });
    //   expect(wrapper.find('div').text()).toBe('baz');
  });

  // it('Handles props.className', () => {
  //   expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-card');

  //   wrapper.setProps({ className: 'foo' });
  //   expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-card foo');

  //   wrapper.setProps({ className: 'foo bar' });
  //   expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-card foo bar');
  // });

  // it('Handles props.href', () => {
  //   expect(wrapper.getDOMNode().getAttribute('href')).toBe(null);

  //   wrapper.setProps({ href: '#', tabIndex: false });
  //   expect(wrapper.getDOMNode().getAttribute('class')).toBe(
  //     'oc-card oc-card--clickable'
  //   );
  //   expect(wrapper.getDOMNode().getAttribute('href')).toBe('#');
  //   expect(wrapper.getDOMNode().getAttribute('tabIndex')).toBe(null);

  //   wrapper.setProps({ href: 'https://www.example.com', tabIndex: true });
  //   expect(wrapper.getDOMNode().getAttribute('class')).toBe(
  //     'oc-card oc-card--clickable'
  //   );
  //   expect(wrapper.getDOMNode().getAttribute('href')).toBe(
  //     'https://www.example.com'
  //   );
  //   expect(wrapper.getDOMNode().getAttribute('tabIndex')).toBe('0');
  // });

  // it('Handles props.modifiers', () => {
  //   expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-card');

  //   wrapper.setProps({ modifiers: 'card--s' });
  //   expect(wrapper.getDOMNode().getAttribute('class')).toBe(
  //     'oc-card oc-card--s'
  //   );

  //   wrapper.setProps({ modifiers: 'card--m' });
  //   expect(wrapper.getDOMNode().getAttribute('class')).toBe(
  //     'oc-card oc-card--m'
  //   );

  //   wrapper.setProps({ modifiers: 'card--l' });
  //   expect(wrapper.getDOMNode().getAttribute('class')).toBe(
  //     'oc-card oc-card--l'
  //   );
  // });

  // it('Handles props.style', () => {
  //   expect(wrapper.getDOMNode().getAttribute('style')).toBe(null);

  //   wrapper.setProps({ style: { zIndex: '1' } });
  //   expect(wrapper.getDOMNode().getAttribute('style')).toBe('z-index: 1;');

  //   wrapper.setProps({ style: { zIndex: '1', opacity: 0 } });
  //   expect(wrapper.getDOMNode().getAttribute('style')).toBe(
  //     'z-index: 1; opacity: 0;'
  //   );
  // });

  // it('Handles props.tabIndex', () => {
  //   expect(wrapper.getDOMNode().getAttribute('tabIndex')).toBe(null);

  //   wrapper.setProps({ modifiers: 'card--clickable' });
  //   expect(wrapper.getDOMNode().getAttribute('tabIndex')).toBe('0');

  //   wrapper.setProps({ modifiers: 'card--draggable' });
  //   expect(wrapper.getDOMNode().getAttribute('tabIndex')).toBe('0');

  //   wrapper.setProps({ modifiers: 'card--clickable', tabIndex: false });
  //   expect(wrapper.getDOMNode().getAttribute('tabIndex')).toBe(null);

  //   wrapper.setProps({ modifiers: 'card--draggable', tabIndex: false });
  //   expect(wrapper.getDOMNode().getAttribute('tabIndex')).toBe(null);
  // });

  afterEach(() => {
    wrapper.unmount();
  });
});
