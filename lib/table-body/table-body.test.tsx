import { mount } from 'enzyme';
import React from 'react';
import { NAMESPACE } from '../utilities/ts/constants';
import TableBody from './table-body';

let wrapper;

describe(`<TableBody />`, () => {
  beforeEach(() => {
    wrapper = mount(
      <table>
        <TableBody>
          <tr />
        </TableBody>
      </table>
    );
  });

  it(`Handles props.children`, () => {
    expect(wrapper.find(`tbody`).html()).toBe(
      `<tbody class="${NAMESPACE}-tbody"><tr></tr></tbody>`
    );

    wrapper.unmount();

    wrapper = mount(
      <table>
        <TableBody>
          <tr>
            <td />
          </tr>
        </TableBody>
      </table>
    );
    expect(wrapper.find(`tbody`).html()).toBe(
      `<tbody class="${NAMESPACE}-tbody"><tr><td></td></tr></tbody>`
    );
  });

  it(`Handles props.className`, () => {
    expect(
      wrapper
        .find(`tbody`)
        .getDOMNode()
        .getAttribute(`class`)
    ).toBe(`${NAMESPACE}-tbody`);

    wrapper.unmount();

    wrapper = mount(
      <table>
        <TableBody className="foo">
          <tr />
        </TableBody>
      </table>
    );
    expect(
      wrapper
        .find(`tbody`)
        .getDOMNode()
        .getAttribute(`class`)
    ).toBe(`${NAMESPACE}-tbody foo`);

    wrapper.unmount();

    wrapper = mount(
      <table>
        <TableBody className="foo bar">
          <tr />
        </TableBody>
      </table>
    );
    expect(
      wrapper
        .find(`tbody`)
        .getDOMNode()
        .getAttribute(`class`)
    ).toBe(`${NAMESPACE}-tbody foo bar`);
  });

  it(`Handles props.style`, () => {
    expect(
      wrapper
        .find(`tbody`)
        .getDOMNode()
        .getAttribute(`style`)
    ).toBe(null);

    wrapper.unmount();

    wrapper = mount(
      <table>
        <TableBody style={{ zIndex: 1 }}>
          <tr />
        </TableBody>
      </table>
    );
    expect(
      wrapper
        .find(`tbody`)
        .getDOMNode()
        .getAttribute(`style`)
    ).toBe(`z-index: 1;`);

    wrapper.unmount();

    wrapper = mount(
      <table>
        <TableBody style={{ zIndex: 1, opacity: 0 }}>
          <tr />
        </TableBody>
      </table>
    );

    expect(
      wrapper
        .find(`tbody`)
        .getDOMNode()
        .getAttribute(`style`)
    ).toBe(`z-index: 1; opacity: 0;`);
  });

  afterEach(() => {
    wrapper.unmount();
  });
});
