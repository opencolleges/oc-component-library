import { mount } from 'enzyme';
import React from 'react';
import { NAMESPACE } from '../utilities/ts/constants';
import TableHead from './table-head';

let wrapper;

describe(`<TableHead />`, () => {
  beforeEach(() => {
    wrapper = mount(
      <table>
        <TableHead>
          <tr />
        </TableHead>
      </table>
    );
  });

  it(`Handles props.children`, () => {
    expect(wrapper.find(`thead`).html()).toBe(
      `<thead class="${NAMESPACE}-thead"><tr></tr></thead>`
    );

    wrapper.unmount();

    wrapper = mount(
      <table>
        <TableHead>
          <tr>
            <td />
          </tr>
        </TableHead>
      </table>
    );
    expect(wrapper.find(`thead`).html()).toBe(
      `<thead class="${NAMESPACE}-thead"><tr><td></td></tr></thead>`
    );
  });

  it(`Handles props.className`, () => {
    expect(
      wrapper
        .find(`thead`)
        .getDOMNode()
        .getAttribute(`class`)
    ).toBe(`${NAMESPACE}-thead`);

    wrapper.unmount();

    wrapper = mount(
      <table>
        <TableHead className="foo">
          <tr>
            <td />
          </tr>
        </TableHead>
      </table>
    );

    wrapper.setProps({ className: `foo` });
    expect(
      wrapper
        .find(`thead`)
        .getDOMNode()
        .getAttribute(`class`)
    ).toBe(`${NAMESPACE}-thead foo`);

    wrapper.unmount();

    wrapper = mount(
      <table>
        <TableHead className="foo bar">
          <tr>
            <td />
          </tr>
        </TableHead>
      </table>
    );
    expect(
      wrapper
        .find(`thead`)
        .getDOMNode()
        .getAttribute(`class`)
    ).toBe(`${NAMESPACE}-thead foo bar`);
  });

  it(`Handles props.style`, () => {
    expect(
      wrapper
        .find(`thead`)
        .getDOMNode()
        .getAttribute(`style`)
    ).toBe(null);

    wrapper.unmount();

    wrapper = mount(
      <table>
        <TableHead style={{ zIndex: 1 }}>
          <tr>
            <td />
          </tr>
        </TableHead>
      </table>
    );
    expect(
      wrapper
        .find(`thead`)
        .getDOMNode()
        .getAttribute(`style`)
    ).toBe(`z-index: 1;`);

    wrapper.unmount();

    wrapper = mount(
      <table>
        <TableHead style={{ zIndex: 1, opacity: 0 }}>
          <tr>
            <td />
          </tr>
        </TableHead>
      </table>
    );
    expect(
      wrapper
        .find(`thead`)
        .getDOMNode()
        .getAttribute(`style`)
    ).toBe(`z-index: 1; opacity: 0;`);
  });

  afterEach(() => {
    wrapper.unmount();
  });
});
