import React from 'react';

import Toast from './toast';

import { NAMESPACE } from '../utilities/ts/constants';

import { mount } from 'enzyme';

let wrapper;

describe(`<Toast />`, () => {
  beforeEach(() => {
    wrapper = mount(
      <Toast id="foo" heading="Bar" message="Baz" duration={1000} />
    );
  });

  it(`Handles props.className`, () => {
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-toast mounted`
    );

    wrapper.setProps({ className: `baz` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-toast mounted baz`
    );

    wrapper.setProps({ className: `baz qui` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-toast mounted baz qui`
    );
  });

  it(`Handles props.duration`, done => {
    const TOAST_TRANSITION_DURATION: number = 500;
    const TOAST_MOUNT_DURATION: number = 1000;

    setTimeout(() => {
      expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
        `${NAMESPACE}-toast mounted`
      );
    }, TOAST_TRANSITION_DURATION);

    setTimeout(() => {
      expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
        `${NAMESPACE}-toast`
      );
    }, TOAST_TRANSITION_DURATION + TOAST_MOUNT_DURATION);

    setTimeout(() => {
      wrapper.update();

      expect(wrapper).toMatchObject({});
      done();
    }, TOAST_TRANSITION_DURATION + TOAST_MOUNT_DURATION + TOAST_TRANSITION_DURATION);
  });

  it(`Handles props.heading`, () => {
    expect(wrapper.find(`.${NAMESPACE}-toast__heading`).text()).toBe(`Bar`);

    wrapper.setProps({ heading: `Baz` });
    expect(wrapper.find(`.${NAMESPACE}-toast__heading`).text()).toBe(`Baz`);

    wrapper.setProps({ heading: `` });
    expect(wrapper.find(`.${NAMESPACE}-toast__heading`).text()).toBe(``);

    wrapper.setProps({ heading: `Qui` });
    expect(wrapper.find(`.${NAMESPACE}-toast__heading`).text()).toBe(`Qui`);
  });

  it(`Handles props.icon`, () => {
    expect(wrapper.find(`.${NAMESPACE}-icon`).length).toBe(3);

    wrapper.setProps({ icon: `calendar` });
    expect(wrapper.find(`.${NAMESPACE}-icon`).length).toBe(4);
    expect(
      wrapper
        .find(`.${NAMESPACE}-icon`)
        .last()
        .getDOMNode()
        .getAttribute(`class`)
    ).toBe(`${NAMESPACE}-icon ${NAMESPACE}-icon--calendar active`);

    wrapper.setProps({ icon: `print` });
    expect(wrapper.find(`.${NAMESPACE}-icon`).length).toBe(4);
    expect(
      wrapper
        .find(`.${NAMESPACE}-icon`)
        .last()
        .getDOMNode()
        .getAttribute(`class`)
    ).toBe(`${NAMESPACE}-icon ${NAMESPACE}-icon--print active`);

    wrapper.setProps({ icon: null });
    expect(wrapper.find(`.${NAMESPACE}-icon`).length).toBe(3);
  });

  it(`Handles props.id`, () => {
    expect(
      wrapper
        .find(`.${NAMESPACE}-toast__button`)
        .getDOMNode()
        .getAttribute(`id`)
    ).toBe(`foo`);

    wrapper.setProps({ id: `bar` });
    expect(
      wrapper
        .find(`.${NAMESPACE}-toast__button`)
        .getDOMNode()
        .getAttribute(`id`)
    ).toBe(`bar`);

    wrapper.setProps({ id: `baz` });
    expect(
      wrapper
        .find(`.${NAMESPACE}-toast__button`)
        .getDOMNode()
        .getAttribute(`id`)
    ).toBe(`baz`);
  });

  it(`Handles props.message`, () => {
    expect(wrapper.find(`.${NAMESPACE}-toast__message`).text()).toBe(`Baz`);

    wrapper.setProps({ message: `Qui` });
    expect(wrapper.find(`.${NAMESPACE}-toast__message`).text()).toBe(`Qui`);

    wrapper.setProps({ message: `` });
    expect(wrapper.find(`.${NAMESPACE}-toast__message`).text()).toBe(``);

    wrapper.setProps({ message: `Qux` });
    expect(wrapper.find(`.${NAMESPACE}-toast__message`).text()).toBe(`Qux`);
  });

  it(`Handles props.modifiers`, () => {
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-toast mounted`
    );

    wrapper.setProps({ modifiers: `error` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-toast ${NAMESPACE}-toast--error mounted`
    );

    wrapper.setProps({ modifiers: `success` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-toast ${NAMESPACE}-toast--success mounted`
    );
  });

  it(`Handles props.style`, () => {
    expect(wrapper.getDOMNode().getAttribute(`style`)).toBe(`top: 1rem;`);

    wrapper.setProps({ style: { zIndex: `1` } });
    expect(wrapper.getDOMNode().getAttribute(`style`)).toBe(
      `top: 1rem; z-index: 1;`
    );

    wrapper.setProps({ style: { zIndex: `1`, opacity: 0 } });
    expect(wrapper.getDOMNode().getAttribute(`style`)).toBe(
      `top: 1rem; z-index: 1; opacity: 0;`
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });
});
