import * as React from 'react';

import TableHead from './table-head';

import { mount } from 'enzyme';

let wrapper;

describe('<TableHead />', () => {
  beforeEach(() => {
    wrapper = mount(
      <TableHead>
        <tr />
      </TableHead>
    );
  });

  it('Handles props.children', () => {
    expect(wrapper.html()).toBe('<thead class="oc-thead"><tr></tr></thead>');

    wrapper.setProps({
      children: (
        <tr>
          <td />
        </tr>
      )
    });
    expect(wrapper.html()).toBe(
      '<thead class="oc-thead"><tr><td></td></tr></thead>'
    );
  });

  it('Handles props.className', () => {
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-thead');

    wrapper.setProps({ className: 'foo' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-thead foo');

    wrapper.setProps({ className: 'foo bar' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-thead foo bar');
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
