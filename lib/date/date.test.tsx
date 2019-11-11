import { mount } from 'enzyme';
import React from 'react';
import { NAMESPACE } from '../utilities/ts/constants';
import Date from './date';

let wrapper;

describe(`<Date />`, () => {
  beforeEach(() => {
    wrapper = mount(<Date label="foo" />);
  });

  it(`Handles props.className`, () => {
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-date`
    );

    wrapper.setProps({ className: `foo` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-date foo`
    );

    wrapper.setProps({ className: `foo bar` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-date foo bar`
    );
  });

  it(`Handles props.disabled`, () => {
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`disabled`)
    ).toBe(null);

    wrapper.setProps({ disabled: true });
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`disabled`)
    ).toBe(``);

    wrapper.setProps({ disabled: false });
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`disabled`)
    ).toBe(null);
  });

  it(`Handles props.id`, () => {
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`id`)
    ).toBe(`${NAMESPACE}-3`);

    wrapper.unmount();

    wrapper = mount(<Date label="bar" />);

    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`id`)
    ).toBe(`${NAMESPACE}-4`);

    wrapper.unmount();

    wrapper = mount(<Date id="baz" label="bar" />);
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`id`)
    ).toBe(`baz`);
  });

  it(`Handles props.label`, () => {
    expect(wrapper.find(`label`).text()).toBe(`foo`);

    wrapper.setProps({ label: `Bar` });
    expect(wrapper.find(`label`).text()).toBe(`Bar`);

    wrapper.setProps({ label: `Bar baz` });
    expect(wrapper.find(`label`).text()).toBe(`Bar baz`);
  });

  it(`Handles props.maxDate`, () => {
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`value`)
    ).toBe(``);

    wrapper.unmount();

    wrapper = mount(
      <Date label="bar" maxDate="2019-10-26" value="2019-10-26" />
    );
    expect(
      wrapper
        .find(`li[data-item="2019-10-26"]`)
        .getDOMNode()
        .getAttribute(`class`)
    ).toBe(`${NAMESPACE}-date__item ${NAMESPACE}-date__item--selectable`);
    expect(
      wrapper
        .find(`li[data-item="2019-10-26"]`)
        .getDOMNode()
        .getAttribute(`tabindex`)
    ).toBe(`-1`);
    expect(
      wrapper
        .find(`li[data-item="2019-10-27"]`)
        .getDOMNode()
        .getAttribute(`class`)
    ).toBe(`${NAMESPACE}-date__item`);
    expect(
      wrapper
        .find(`li[data-item="2019-10-27"]`)
        .getDOMNode()
        .getAttribute(`tabindex`)
    ).toBe(null);

    wrapper.unmount();

    wrapper = mount(
      <Date label="bar" maxDate="2019-05-07" value="2019-05-07" />
    );
    expect(
      wrapper
        .find(`li[data-item="2019-05-07"]`)
        .getDOMNode()
        .getAttribute(`class`)
    ).toBe(`${NAMESPACE}-date__item ${NAMESPACE}-date__item--selectable`);
    expect(
      wrapper
        .find(`li[data-item="2019-05-07"]`)
        .getDOMNode()
        .getAttribute(`tabindex`)
    ).toBe(`-1`);
    expect(
      wrapper
        .find(`li[data-item="2019-05-08"]`)
        .getDOMNode()
        .getAttribute(`class`)
    ).toBe(`${NAMESPACE}-date__item`);
    expect(
      wrapper
        .find(`li[data-item="2019-05-08"]`)
        .getDOMNode()
        .getAttribute(`tabindex`)
    ).toBe(null);
  });

  it(`Handles props.message`, () => {
    wrapper.setProps({ modifiers: `error` });
    expect(wrapper.find(`.${NAMESPACE}-date__message`).length).toBe(0);

    wrapper.setProps({ message: `Qux` });
    expect(wrapper.find(`.${NAMESPACE}-date__message`).length).toBe(1);
    expect(wrapper.find(`.${NAMESPACE}-date__message`).text()).toBe(`Qux`);

    wrapper.setProps({ modifiers: `success`, message: `` });
    expect(wrapper.find(`.${NAMESPACE}-date__message`).length).toBe(0);

    wrapper.setProps({ message: `Corge` });
    expect(wrapper.find(`.${NAMESPACE}-date__message`).length).toBe(1);
    expect(wrapper.find(`.${NAMESPACE}-date__message`).text()).toBe(`Corge`);
  });

  it(`Handles props.minDate`, () => {
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`value`)
    ).toBe(``);

    wrapper.unmount();

    wrapper = mount(
      <Date label="bar" minDate="2019-10-26" value="2019-10-26" />
    );
    expect(
      wrapper
        .find(`li[data-item="2019-10-26"]`)
        .getDOMNode()
        .getAttribute(`class`)
    ).toBe(`${NAMESPACE}-date__item ${NAMESPACE}-date__item--selectable`);
    expect(
      wrapper
        .find(`li[data-item="2019-10-26"]`)
        .getDOMNode()
        .getAttribute(`tabindex`)
    ).toBe(`-1`);
    expect(
      wrapper
        .find(`li[data-item="2019-10-25"]`)
        .getDOMNode()
        .getAttribute(`class`)
    ).toBe(`${NAMESPACE}-date__item`);
    expect(
      wrapper
        .find(`li[data-item="2019-10-25"]`)
        .getDOMNode()
        .getAttribute(`tabindex`)
    ).toBe(null);

    wrapper.unmount();

    wrapper = mount(
      <Date label="bar" minDate="2019-05-07" value="2019-05-07" />
    );
    expect(
      wrapper
        .find(`li[data-item="2019-05-07"]`)
        .getDOMNode()
        .getAttribute(`class`)
    ).toBe(`${NAMESPACE}-date__item ${NAMESPACE}-date__item--selectable`);
    expect(
      wrapper
        .find(`li[data-item="2019-05-07"]`)
        .getDOMNode()
        .getAttribute(`tabindex`)
    ).toBe(`-1`);
    expect(
      wrapper
        .find(`li[data-item="2019-05-06"]`)
        .getDOMNode()
        .getAttribute(`class`)
    ).toBe(`${NAMESPACE}-date__item`);
    expect(
      wrapper
        .find(`li[data-item="2019-05-06"]`)
        .getDOMNode()
        .getAttribute(`tabindex`)
    ).toBe(null);
  });

  it(`Handles props.modifiers`, () => {
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-date`
    );

    wrapper.setProps({ modifiers: `error` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-date ${NAMESPACE}-date--error`
    );

    wrapper.setProps({ modifiers: `success` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-date ${NAMESPACE}-date--success`
    );
  });

  it(`Handles props.name`, () => {
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`name`)
    ).toBe(null);

    wrapper.setProps({ name: `bar` });
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`name`)
    ).toBe(`bar`);

    wrapper.setProps({ name: `baz` });
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`name`)
    ).toBe(`baz`);
  });

  it(`Handles props.readonly`, () => {
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`readonly`)
    ).toBe(null);

    wrapper.setProps({ readOnly: true });
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`readonly`)
    ).toBe(``);

    wrapper.setProps({ readOnly: false });
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`readonly`)
    ).toBe(null);
  });

  it(`Handles props.required`, () => {
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`required`)
    ).toBe(null);

    wrapper.setProps({ required: true });
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`required`)
    ).toBe(``);

    wrapper.setProps({ required: false });
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`required`)
    ).toBe(null);
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

  it(`Handles props.value`, () => {
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`value`)
    ).toBe(``);

    wrapper.unmount();

    wrapper = mount(<Date label="bar" value="2019-10-25" />);

    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-date selected`
    );
    expect(wrapper.find(`span`).text()).toBe(`25th Oct 2019`);
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`value`)
    ).toBe(`2019-10-25`);

    wrapper.unmount();

    wrapper = mount(<Date label="bar" value="2020-05-03" />);

    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-date selected`
    );
    expect(wrapper.find(`span`).text()).toBe(`3rd May 2020`);
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`value`)
    ).toBe(`2020-05-03`);
  });

  afterEach(() => {
    wrapper.unmount();
  });
});
