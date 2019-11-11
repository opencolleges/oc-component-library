import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { NAMESPACE } from '../utilities/ts/constants';
import Checkbox from './checkbox';

let wrapper: ReactWrapper = null;

describe(`<Checkbox />`, () => {
  beforeEach(() => {
    wrapper = mount(<Checkbox value="foo">Foo</Checkbox>);
  });

  it(`Handles props.checked`, () => {
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`checked`)
    ).toBe(null);

    wrapper.setProps({ checked: true });
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`checked`)
    ).toBe(``);

    wrapper.setProps({ checked: false });
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`checked`)
    ).toBe(null);
  });

  it(`Handles props.children`, () => {
    expect(wrapper.find(`label`).text()).toBe(`Foo`);

    wrapper.setProps({ children: `Bar` });
    expect(wrapper.find(`label`).text()).toBe(`Bar`);

    wrapper.setProps({ children: `Bar baz` });
    expect(wrapper.find(`label`).text()).toBe(`Bar baz`);
  });

  it(`Handles props.className`, () => {
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-checkbox`
    );

    wrapper.setProps({ className: `foo` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-checkbox foo`
    );

    wrapper.setProps({ className: `foo bar` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-checkbox foo bar`
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
    ).toBe(`${NAMESPACE}-5`);

    wrapper.unmount();

    wrapper = mount(<Checkbox value="foo">Foo</Checkbox>);
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`id`)
    ).toBe(`${NAMESPACE}-6`);

    wrapper.unmount();

    wrapper = mount(
      <Checkbox id="bar" value="foo">
        Foo
      </Checkbox>
    );
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`id`)
    ).toBe(`bar`);
  });

  it(`Handles props.modifiers`, () => {
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-checkbox`
    );

    wrapper.setProps({ modifiers: `error` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-checkbox ${NAMESPACE}-checkbox--error`
    );

    wrapper.setProps({ modifiers: `success` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-checkbox ${NAMESPACE}-checkbox--success`
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
    ).toBe(`foo`);

    wrapper.setProps({ value: `bar` });
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`value`)
    ).toBe(`bar`);

    wrapper.setProps({ value: `baz` });
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`value`)
    ).toBe(`baz`);
  });

  afterEach(() => {
    wrapper.unmount();
  });
});
