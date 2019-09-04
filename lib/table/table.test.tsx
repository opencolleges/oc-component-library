import * as React from 'react';

import Table from './table';

import { mount } from 'enzyme';

let wrapper;

describe('<Table />', () => {
  beforeEach(() => {
    wrapper = mount(
      <Table>
        <thead />
      </Table>
    );
  });

  it('Handles props.children', () => {
    expect(wrapper.html()).toBe(
      '<table class="oc-table"><thead></thead></table>'
    );

    wrapper.setProps({ children: <tbody /> });
    expect(wrapper.html()).toBe(
      '<table class="oc-table"><tbody></tbody></table>'
    );
  });

  it('Handles props.modifiers', () => {
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-table');

    wrapper.setProps({ modifiers: 'table--center' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-table oc-table--center'
    );

    wrapper.setProps({ modifiers: 'table--right' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-table oc-table--right'
    );
  });

  it('Handles props.className', () => {
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-table');

    wrapper.setProps({ className: 'foo' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-table foo');

    wrapper.setProps({ className: 'foo bar' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-table foo bar');
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
