import * as React from 'react';

import TableRow from './table-row';

import { mount } from 'enzyme';

let wrapper;

describe('<TableRow />', () => {
  beforeEach(() => {
    wrapper = mount(
      <TableRow>
        <th />
      </TableRow>
    );
  });

  it('Handles props.children', () => {
    expect(wrapper.html()).toBe('<tr class="oc-tr"><th></th></tr>');

    wrapper.setProps({ children: <td /> });
    expect(wrapper.html()).toBe('<tr class="oc-tr"><td></td></tr>');
  });

  it('Handles props.modifiers', () => {
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-tr');

    wrapper.setProps({ modifiers: 'tr--center' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-tr oc-tr--center'
    );

    wrapper.setProps({ modifiers: 'tr--right' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-tr oc-tr--right'
    );
  });

  it('Handles props.className', () => {
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-tr');

    wrapper.setProps({ className: 'foo' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-tr foo');

    wrapper.setProps({ className: 'foo bar' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-tr foo bar');
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
