import * as React from 'react';

import TableRow from './table-row';

import { mount } from 'enzyme';

let wrapper;

describe('<TableRow />', () => {
  beforeEach(() => {
    wrapper = mount(
      <table>
        <tbody>
          <TableRow>
            <th />
          </TableRow>
        </tbody>
      </table>
    );
  });

  it('Handles props.children', () => {
    expect(wrapper.find('tr').html()).toBe('<tr class="oc-tr"><th></th></tr>');

    wrapper.unmount();

    wrapper = mount(
      <table>
        <tbody>
          <TableRow>
            <td />
          </TableRow>
        </tbody>
      </table>
    );
    expect(wrapper.find('tr').html()).toBe('<tr class="oc-tr"><td></td></tr>');
  });

  it('Handles props.modifiers', () => {
    expect(
      wrapper
        .find('tr')
        .getDOMNode()
        .getAttribute('class')
    ).toBe('oc-tr');

    wrapper.unmount();

    wrapper = mount(
      <table>
        <tbody>
          <TableRow modifiers="center">
            <td />
          </TableRow>
        </tbody>
      </table>
    );
    expect(
      wrapper
        .find('tr')
        .getDOMNode()
        .getAttribute('class')
    ).toBe('oc-tr oc-tr--center');

    wrapper.unmount();

    wrapper = mount(
      <table>
        <tbody>
          <TableRow modifiers="right">
            <td />
          </TableRow>
        </tbody>
      </table>
    );
    expect(
      wrapper
        .find('tr')
        .getDOMNode()
        .getAttribute('class')
    ).toBe('oc-tr oc-tr--right');
  });

  it('Handles props.className', () => {
    expect(
      wrapper
        .find('tr')
        .getDOMNode()
        .getAttribute('class')
    ).toBe('oc-tr');

    wrapper.unmount();

    wrapper = mount(
      <table>
        <tbody>
          <TableRow className="foo">
            <td />
          </TableRow>
        </tbody>
      </table>
    );
    expect(
      wrapper
        .find('tr')
        .getDOMNode()
        .getAttribute('class')
    ).toBe('oc-tr foo');

    wrapper.unmount();

    wrapper = mount(
      <table>
        <tbody>
          <TableRow className="foo bar">
            <td />
          </TableRow>
        </tbody>
      </table>
    );
    expect(
      wrapper
        .find('tr')
        .getDOMNode()
        .getAttribute('class')
    ).toBe('oc-tr foo bar');
  });

  it('Handles props.style', () => {
    expect(
      wrapper
        .find('tr')
        .getDOMNode()
        .getAttribute('style')
    ).toBe(null);

    wrapper.unmount();

    wrapper = mount(
      <table>
        <tbody>
          <TableRow style={{ zIndex: 1 }}>
            <td />
          </TableRow>
        </tbody>
      </table>
    );
    expect(
      wrapper
        .find('tr')
        .getDOMNode()
        .getAttribute('style')
    ).toBe('z-index: 1;');

    wrapper.unmount();

    wrapper = mount(
      <table>
        <tbody>
          <TableRow style={{ zIndex: 1, opacity: 0 }}>
            <td />
          </TableRow>
        </tbody>
      </table>
    );
    expect(
      wrapper
        .find('tr')
        .getDOMNode()
        .getAttribute('style')
    ).toBe('z-index: 1; opacity: 0;');
  });

  afterEach(() => {
    wrapper.unmount();
  });
});
