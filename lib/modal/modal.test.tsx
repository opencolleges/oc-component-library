import React from 'react';

import Copy from '../copy';
import Modal from './modal';

import { NAMESPACE } from '../utilities/ts/constants';

import { mount } from 'enzyme';

let wrapper;

describe(`<Modal />`, () => {
  beforeEach(() => {
    wrapper = mount(<Modal message="Foo" />);
  });

  it(`Handles props.backButton`, () => {
    expect(
      wrapper
        .find(`.${NAMESPACE}-button`)
        .at(0)
        .text()
    ).toBe(`Back`);

    wrapper.setProps({
      backButton: {
        label: `Cancel`,
        modifiers: `secondary`
      }
    });
    expect(
      wrapper
        .find(`.${NAMESPACE}-button`)
        .at(0)
        .text()
    ).toBe(`Cancel`);

    wrapper.unmount();

    wrapper = mount(
      <Modal
        message="Foo"
        backButton={{
          label: `Close`,
          modifiers: `secondary`
        }}
      />
    );
    expect(
      wrapper
        .find(`.${NAMESPACE}-button`)
        .at(0)
        .text()
    ).toBe(`Close`);
  });

  it(`Handles props.buttons`, () => {
    expect(wrapper.find(`.${NAMESPACE}-button`).length).toBe(1);
    expect(
      wrapper
        .find(`.${NAMESPACE}-button`)
        .at(0)
        .text()
    ).toBe(`Back`);

    wrapper.unmount();

    wrapper = mount(
      <Modal
        message="Foo"
        buttons={[
          {
            label: `Bar`,
            modifiers: `secondary`,
            onClick: () => {
              return;
            }
          }
        ]}
      />
    );

    expect(wrapper.find(`.${NAMESPACE}-button`).length).toBe(2);
    expect(
      wrapper
        .find(`.${NAMESPACE}-button`)
        .at(0)
        .text()
    ).toBe(`Back`);

    expect(
      wrapper
        .find(`.${NAMESPACE}-button`)
        .at(1)
        .text()
    ).toBe(`Bar`);

    wrapper.unmount();

    wrapper = mount(
      <Modal
        message="Foo"
        buttons={[
          {
            label: `Foo`,
            modifiers: `primary error`,
            onClick: () => {
              return;
            }
          }
        ]}
      />
    );

    expect(wrapper.find(`.${NAMESPACE}-button`).length).toBe(2);
    expect(
      wrapper
        .find(`.${NAMESPACE}-button`)
        .at(0)
        .text()
    ).toBe(`Back`);

    expect(
      wrapper
        .find(`.${NAMESPACE}-button`)
        .at(1)
        .text()
    ).toBe(`Foo`);
  });

  it(`Handles props.children`, () => {
    wrapper = mount(
      <Modal message="Foo">
        <Copy modifiers="center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Copy>
      </Modal>
    );
    expect(wrapper.find(`.${NAMESPACE}-p`).text()).toBe(
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
    );

    wrapper.unmount();

    wrapper = mount(
      <Modal message="Foo">
        <Copy modifiers="center">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.
        </Copy>
      </Modal>
    );
    expect(wrapper.find(`.${NAMESPACE}-p`).text()).toBe(
      `Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`
    );
  });

  it(`Handles props.className`, () => {
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-modal`
    );

    wrapper.setProps({ className: `foo` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-modal foo`
    );

    wrapper.setProps({ className: `foo bar` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-modal foo bar`
    );
  });

  it(`Handles props.message`, () => {
    expect(
      wrapper
        .find(`h3`)
        .first()
        .text()
    ).toBe(`Foo`);

    wrapper.setProps({ message: `Qux` });
    expect(
      wrapper
        .find(`h3`)
        .first()
        .text()
    ).toBe(`Qux`);

    wrapper.setProps({ message: `` });
    expect(
      wrapper
        .find(`h3`)
        .first()
        .text()
    ).toBe(``);

    wrapper.setProps({ message: `Corge` });
    expect(
      wrapper
        .find(`h3`)
        .first()
        .text()
    ).toBe(`Corge`);
  });

  it(`Handles props.style`, () => {
    expect(wrapper.getDOMNode().getAttribute(`style`)).toBe(null);

    wrapper.setProps({ style: { zIndex: `1` } });
    expect(wrapper.getDOMNode().getAttribute(`style`)).toBe(`z-index: 1;`);

    wrapper.setProps({ style: { zIndex: `1`, opacity: 0 } });
    expect(wrapper.getDOMNode().getAttribute(`style`)).toBe(
      `z-index: 1; opacity: 0;`
    );
  });

  it(`Handles showModal()`, () => {
    wrapper.instance().showModal();
    expect(wrapper.state(`mounted`)).toBe(true);

    wrapper.unmount();

    wrapper = mount(<Modal active={true} message="Foo" />);
    wrapper.setState({ mounted: false });
    wrapper.instance().showModal();
    expect(wrapper.state(`mounted`)).toBe(true);
  });

  it(`Handles closeModal()`, () => {
    wrapper.setState({ mounted: true });
    expect(wrapper.state(`mounted`)).toBe(true);
    wrapper
      .find(`.${NAMESPACE}-button`)
      .first()
      .simulate(`click`);
    expect(wrapper.state(`mounted`)).toBe(false);

    wrapper.unmount();

    wrapper = mount(<Modal message="Foo" />);
    wrapper.setState({ mounted: true });
    expect(wrapper.state(`mounted`)).toBe(true);
    wrapper
      .find(`.${NAMESPACE}-button`)
      .first()
      .simulate(`click`);
    expect(wrapper.state(`mounted`)).toBe(false);
  });

  afterEach(() => {
    wrapper.unmount();
  });
});
