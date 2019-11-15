import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { NAMESPACE, TRANSITION_DURATION_x4 } from '../utilities/ts/constants';
import Toast from './toast';

let wrapper: ReactWrapper = null;

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
    setTimeout(() => {
      expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
        `${NAMESPACE}-toast mounted`
      );
    }, TRANSITION_DURATION_x4);

    setTimeout(() => {
      expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
        `${NAMESPACE}-toast`
      );
    }, TRANSITION_DURATION_x4 + 1000);

    setTimeout(() => {
      wrapper.update();

      expect(wrapper).toMatchObject({});
      done();
    }, TRANSITION_DURATION_x4 + 1000 + TRANSITION_DURATION_x4);
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
