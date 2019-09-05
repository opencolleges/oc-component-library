import * as React from 'react';

import TableCell from './table-cell';

import { mount } from 'enzyme';

let wrapper;

describe('<TableCell />', () => {
  beforeEach(() => {
    wrapper = mount(
      <TableCell>
        <p />
      </TableCell>
    );
  });

  it('Handles props.children', () => {
    expect(wrapper.html()).toBe('<td class="oc-td"><p></p></td>');

    wrapper.setProps({ children: <strong /> });
    expect(wrapper.html()).toBe('<td class="oc-td"><strong></strong></td>');
  });

  it('Handles props.className', () => {
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-td');

    wrapper.setProps({ className: 'foo' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-td foo');

    wrapper.setProps({ className: 'foo bar' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-td foo bar');
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
    expect(wrapper.html()).toBe('<td class="oc-td"><p></p></td>');

    wrapper.setProps({ tag: 'th' });
    expect(wrapper.html()).toBe('<th class="oc-th"><p></p></th>');

    wrapper.setProps({ tag: 'td' });
    expect(wrapper.html()).toBe('<td class="oc-td"><p></p></td>');
  });

  afterEach(() => {
    wrapper.unmount();
  });
});
