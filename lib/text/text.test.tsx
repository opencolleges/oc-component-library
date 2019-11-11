import { mount } from 'enzyme';
import React from 'react';
import { NAMESPACE } from '../utilities/ts/constants';
import Text from './text';

let wrapper;

describe(`<Text />`, () => {
  beforeEach(() => {
    wrapper = mount(<Text label="foo" />);
  });

  it(`Handles props.autoComplete`, () => {
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`autocomplete`)
    ).toBe(null);

    wrapper.setProps({ autoComplete: `additional-name` });
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`autocomplete`)
    ).toBe(`additional-name`);

    wrapper.setProps({ autoComplete: `address-level1` });
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`autocomplete`)
    ).toBe(`address-level1`);

    wrapper.setProps({ autoComplete: `address-line1` });
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`autocomplete`)
    ).toBe(`address-line1`);
  });

  it(`Handles props.autoFocus`, () => {
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`autofocus`)
    ).toBe(null);

    wrapper.setProps({ autoFocus: true });
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`autofocus`)
    ).toBe(``);

    wrapper.setProps({ autoFocus: false });
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`autofocus`)
    ).toBe(null);
  });

  it(`Handles props.className`, () => {
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-text`
    );

    wrapper.setProps({ className: `foo` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-text foo`
    );

    wrapper.setProps({ className: `foo bar` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-text foo bar`
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

    wrapper = mount(<Text label="foo" />);
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`id`)
    ).toBe(`${NAMESPACE}-6`);

    wrapper.unmount();

    wrapper = mount(<Text label="foo" id="bar" />);
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`id`)
    ).toBe(`bar`);
  });

  it(`Handles props.label`, () => {
    expect(wrapper.find(`label`).text()).toBe(`foo`);

    wrapper.setProps({ label: `Bar` });
    expect(wrapper.find(`label`).text()).toBe(`Bar`);

    wrapper.setProps({ label: `Bar baz` });
    expect(wrapper.find(`label`).text()).toBe(`Bar baz`);
  });

  it(`Handles props.maxLength`, () => {
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`maxlength`)
    ).toBe(null);

    wrapper.setProps({ maxLength: 100 });
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`maxlength`)
    ).toBe(`100`);

    wrapper.setProps({ maxLength: 200 });
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`maxlength`)
    ).toBe(`200`);

    wrapper.setProps({ maxLength: 300 });
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`maxlength`)
    ).toBe(`300`);
  });

  it(`Handles props.message`, () => {
    wrapper.setProps({ error: [`foo`] });
    expect(wrapper.find(`span.${NAMESPACE}-text__message`).length).toBe(0);

    wrapper.setProps({ message: `Qux` });
    expect(wrapper.find(`span.${NAMESPACE}-text__message`).length).toBe(1);
    expect(wrapper.find(`span.${NAMESPACE}-text__message`).text()).toBe(`Qux`);

    wrapper.setProps({ error: [] });
    wrapper.setProps({ message: `` });
    expect(wrapper.find(`span.${NAMESPACE}-text__message`).length).toBe(0);

    wrapper.setProps({ success: [`bar`] });
    wrapper.setProps({ message: `Corge` });
    expect(wrapper.find(`span.${NAMESPACE}-text__message`).length).toBe(1);
    expect(wrapper.find(`span.${NAMESPACE}-text__message`).text()).toBe(
      `Corge`
    );
  });

  it(`Handles props.modifiers`, () => {
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-text`
    );

    wrapper.setProps({ modifiers: `error` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-text ${NAMESPACE}-text--error`
    );

    wrapper.setProps({ modifiers: `success` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-text ${NAMESPACE}-text--success`
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

  it(`Handles props.placeholder`, () => {
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`placeholder`)
    ).toBe(null);

    wrapper.setProps({ placeholder: `bar` });
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`placeholder`)
    ).toBe(`bar`);

    wrapper.setProps({ placeholder: `baz` });
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`placeholder`)
    ).toBe(`baz`);

    wrapper.setProps({ type: `password` });
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`placeholder`)
    ).toBe(null);

    wrapper.setProps({ type: `password`, placeholder: `baz` });
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`placeholder`)
    ).toBe(null);
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

  it(`Handles props.spellCheck`, () => {
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`spellcheck`)
    ).toBe(`false`);

    wrapper.setProps({ spellCheck: true });
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`spellcheck`)
    ).toBe(`true`);

    wrapper.setProps({ spellCheck: false });
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`spellcheck`)
    ).toBe(`false`);
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
    wrapper = mount(<Text label="foo" />);
    expect(wrapper.find(`input`).getDOMNode().value).toBe(``);

    wrapper.unmount();

    wrapper = mount(<Text label="foo" maxLength={0} value="bar" />);
    expect(wrapper.find(`input`).getDOMNode().value).toBe(`bar`);

    wrapper.unmount();

    wrapper = mount(<Text label="foo" maxLength={1} value="bar" />);
    expect(wrapper.find(`input`).getDOMNode().value).toBe(`b`);

    wrapper.unmount();

    wrapper = mount(<Text label="foo" maxLength={2} value="bar" />);
    expect(wrapper.find(`input`).getDOMNode().value).toBe(`ba`);

    wrapper.unmount();

    wrapper = mount(<Text label="foo" value="bar" />);
    expect(wrapper.find(`input`).getDOMNode().value).toBe(`bar`);
  });

  it(`Handles tabIndex`, () => {
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`tabindex`)
    ).toBe(`0`);

    wrapper.setProps({ disable: true, readOnly: true });
    expect(
      wrapper
        .find(`input`)
        .getDOMNode()
        .getAttribute(`tabindex`)
    ).toBe(`-1`);
  });

  it(`Handles onFocus`, () => {
    const onFocus = jest.fn();
    wrapper.setProps({ onFocus });
    wrapper.find(`input`).simulate(`focus`);
    expect(onFocus.mock.calls.length).toBe(1);
  });

  it(`Handles onChange`, () => {
    const onChange = jest.fn();
    wrapper.setProps({ onChange });
    wrapper.find(`input`).simulate(`change`);
    expect(onChange.mock.calls.length).toBe(1);

    onChange.mockClear();
    wrapper.setProps({ type: `password`, onChange });
    wrapper.find(`input`).simulate(`change`);
    expect(onChange.mock.calls.length).toBe(1);
    expect(wrapper.state(`keyStrokes`)).toBe(true);
  });

  it(`Handles onKeyDown`, () => {
    wrapper = mount(<Text label="foo" type="password" />);
    wrapper.setState({ keyStrokes: false, value: `foo` });
    wrapper.find(`input`).simulate(`keydown`, { key: `Backspace` });
    expect(wrapper.state(`value`)).toBe(``);

    wrapper.unmount();

    wrapper = mount(<Text label="foo" type="password" />);
    wrapper.setState({ keyStrokes: false, value: `foo` });
    wrapper.find(`input`).simulate(`keydown`, { key: `Delete` });
    expect(wrapper.state(`value`)).toBe(``);

    wrapper.unmount();

    const preventDefault = jest.fn();
    wrapper = mount(<Text label="foo" type="number" />);
    wrapper.find(`input`).simulate(`keydown`, { key: `b`, preventDefault });
    expect(preventDefault.mock.calls.length).toBe(1);

    wrapper.unmount();

    preventDefault.mockClear();
    wrapper = mount(<Text label="foo" type="number" />);
    wrapper.find(`input`).simulate(`keydown`, { key: `d`, preventDefault });
    expect(preventDefault.mock.calls.length).toBe(1);
  });

  it(`Handles onBlur`, () => {
    const onBlur = jest.fn();
    wrapper.setProps({ onBlur });
    wrapper.find(`input`).simulate(`blur`);
    expect(onBlur.mock.calls.length).toBe(1);
  });

  it(`Handles onPaste`, () => {
    const onPaste = jest.fn();
    wrapper.setProps({ onPaste });
    wrapper.find(`input`).simulate(`paste`);
    expect(onPaste.mock.calls.length).toBe(1);
  });

  afterEach(() => {
    wrapper.unmount();
  });
});
