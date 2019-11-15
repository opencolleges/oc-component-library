import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { NAMESPACE } from '../utilities/ts/constants';
import Toggle from './toggle';

let wrapper: ReactWrapper = null;

describe(`<Toggle />`, () => {
  beforeEach(() => {
    wrapper = mount(<Toggle value="foo">Foo</Toggle>);
  });

  it(`Handles props.checked`, () => {
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`checked`)
    ).toBe(null);

    wrapper.unmount();

    wrapper = mount(
      <Toggle checked={true} value="foo">
        Foo
      </Toggle>
    );
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`checked`)
    ).toBe(``);

    wrapper.unmount();

    wrapper = mount(
      <Toggle checked={false} value="foo">
        Foo
      </Toggle>
    );
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
      `${NAMESPACE}-toggle`
    );

    wrapper.setProps({ className: `bar` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-toggle bar`
    );

    wrapper.setProps({ className: `bar baz` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-toggle bar baz`
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
    ).toBe(`${NAMESPACE}-7`);

    wrapper.unmount();

    wrapper = mount(
      <Toggle id="bar" value="foo">
        Foo
      </Toggle>
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
      `${NAMESPACE}-toggle`
    );

    wrapper.setProps({ modifiers: `right` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-toggle ${NAMESPACE}-toggle--right`
    );

    wrapper.setProps({ modifiers: `error` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-toggle ${NAMESPACE}-toggle--error`
    );

    wrapper.setProps({ modifiers: `right success` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-toggle ${NAMESPACE}-toggle--right ${NAMESPACE}-toggle--success`
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

  it(`Handles props.readOnly`, () => {
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

  it(`Handles state.checked`, () => {
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`checked`)
    ).toBe(null);

    wrapper.setState({ checked: true });
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`checked`)
    ).toBe(``);

    wrapper.setState({ checked: false });
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`checked`)
    ).toBe(null);
  });

  afterEach(() => {
    wrapper.unmount();
  });
});
