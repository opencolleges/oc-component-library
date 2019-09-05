import * as React from 'react';

import TableBody from './table-body';

import { mount } from 'enzyme';

let wrapper;

describe('<TableBody />', () => {
  beforeEach(() => {
    wrapper = mount(
      <TableBody>
        <tr />
      </TableBody>
    );
  });

  it('Handles props.children', () => {
    expect(wrapper.html()).toBe('<tbody class="oc-tbody"><tr></tr></tbody>');

    wrapper.setProps({
      children: (
        <tr>
          <td />
        </tr>
      )
    });
    expect(wrapper.html()).toBe(
      '<tbody class="oc-tbody"><tr><td></td></tr></tbody>'
    );
  });

  it('Handles props.className', () => {
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-tbody');

    wrapper.setProps({ className: 'foo' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-tbody foo');

    wrapper.setProps({ className: 'foo bar' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-tbody foo bar');
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
