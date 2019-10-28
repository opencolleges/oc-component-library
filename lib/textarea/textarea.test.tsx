import React from 'react';

import Textarea from './textarea';

import { NAMESPACE } from '../utilities/ts/constants';

import { mount } from 'enzyme';

let wrapper;

describe(`<Textarea />`, () => {
  beforeEach(() => {
    wrapper = mount(<Textarea label="foo" />);
  });

  it(`Handles props.autoComplete`, () => {
    expect(
      wrapper
        .find(`textarea`)
        .getDOMNode()
        .getAttribute(`autocomplete`)
    ).toBe(null);

    wrapper.setProps({ autoComplete: `on` });
    expect(
      wrapper
        .find(`textarea`)
        .getDOMNode()
        .getAttribute(`autocomplete`)
    ).toBe(`on`);

    wrapper.setProps({ autoComplete: `off` });
    expect(
      wrapper
        .find(`textarea`)
        .getDOMNode()
        .getAttribute(`autocomplete`)
    ).toBe(`off`);
  });

  it(`Handles props.autoFocus`, () => {
    expect(
      wrapper
        .find(`textarea`)
        .getDOMNode()
        .getAttribute(`autofocus`)
    ).toBe(null);

    wrapper.setProps({ autoFocus: true });
    expect(
      wrapper
        .find(`textarea`)
        .getDOMNode()
        .getAttribute(`autofocus`)
    ).toBe(``);

    wrapper.setProps({ autoFocus: false });
    expect(
      wrapper
        .find(`textarea`)
        .getDOMNode()
        .getAttribute(`autofocus`)
    ).toBe(null);
  });

  it(`Handles props.className`, () => {
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-textarea`
    );

    wrapper.setProps({ className: `foo` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-textarea foo`
    );

    wrapper.setProps({ className: `foo bar` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-textarea foo bar`
    );
  });

  it(`Handles props.disabled`, () => {
    expect(
      wrapper
        .find(`textarea`)
        .getDOMNode()
        .getAttribute(`disabled`)
    ).toBe(null);

    wrapper.setProps({ disabled: true });
    expect(
      wrapper
        .find(`textarea`)
        .getDOMNode()
        .getAttribute(`disabled`)
    ).toBe(``);

    wrapper.setProps({ disabled: false });
    expect(
      wrapper
        .find(`textarea`)
        .getDOMNode()
        .getAttribute(`disabled`)
    ).toBe(null);
  });

  it(`Handles props.grammarly`, () => {
    expect(
      wrapper
        .find(`textarea`)
        .getDOMNode()
        .getAttribute(`data-gramm`)
    ).toBe(null);

    wrapper.setProps({ grammarly: true });
    expect(
      wrapper
        .find(`textarea`)
        .getDOMNode()
        .getAttribute(`data-gramm`)
    ).toBe(null);

    wrapper.setProps({ grammarly: false });
    expect(
      wrapper
        .find(`textarea`)
        .getDOMNode()
        .getAttribute(`data-gramm`)
    ).toBe(`false`);
  });

  it(`Handles props.id`, () => {
    expect(
      wrapper
        .find(`textarea`)
        .getDOMNode()
        .getAttribute(`id`)
    ).toBe(`${NAMESPACE}-6`);

    wrapper.unmount();

    wrapper = mount(<Textarea label="foo" />);
    expect(
      wrapper
        .find(`textarea`)
        .getDOMNode()
        .getAttribute(`id`)
    ).toBe(`${NAMESPACE}-7`);

    wrapper.unmount();

    wrapper = mount(<Textarea label="foo" id="bar" />);
    expect(
      wrapper
        .find(`textarea`)
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
        .find(`textarea`)
        .getDOMNode()
        .getAttribute(`maxlength`)
    ).toBe(null);

    wrapper.setProps({ maxLength: 100 });
    expect(
      wrapper
        .find(`textarea`)
        .getDOMNode()
        .getAttribute(`maxlength`)
    ).toBe(`100`);

    wrapper.setProps({ maxLength: 200 });
    expect(
      wrapper
        .find(`textarea`)
        .getDOMNode()
        .getAttribute(`maxlength`)
    ).toBe(`200`);

    wrapper.setProps({ maxLength: 300 });
    expect(
      wrapper
        .find(`textarea`)
        .getDOMNode()
        .getAttribute(`maxlength`)
    ).toBe(`300`);
  });

  it(`Handles props.message`, () => {
    expect(wrapper.find(`span.${NAMESPACE}-textarea__message`).text()).toBe(``);

    wrapper.setProps({ message: `Qux` });
    expect(wrapper.find(`span.${NAMESPACE}-textarea__message`).text()).toBe(
      `Qux`
    );

    wrapper.setProps({ message: `` });
    expect(wrapper.find(`span.${NAMESPACE}-textarea__message`).text()).toBe(``);

    wrapper.setProps({ message: `Corge` });
    expect(wrapper.find(`span.${NAMESPACE}-textarea__message`).text()).toBe(
      `Corge`
    );
  });

  it(`Handles props.modifiers`, () => {
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-textarea`
    );

    wrapper.setProps({ modifiers: `error` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-textarea ${NAMESPACE}-textarea--error`
    );

    wrapper.setProps({ modifiers: `success` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-textarea ${NAMESPACE}-textarea--success`
    );
  });

  it(`Handles props.name`, () => {
    expect(
      wrapper
        .find(`textarea`)
        .getDOMNode()
        .getAttribute(`name`)
    ).toBe(null);

    wrapper.setProps({ name: `bar` });
    expect(
      wrapper
        .find(`textarea`)
        .getDOMNode()
        .getAttribute(`name`)
    ).toBe(`bar`);

    wrapper.setProps({ name: `baz` });
    expect(
      wrapper
        .find(`textarea`)
        .getDOMNode()
        .getAttribute(`name`)
    ).toBe(`baz`);
  });

  it(`Handles props.placeholder`, () => {
    expect(
      wrapper
        .find(`textarea`)
        .getDOMNode()
        .getAttribute(`placeholder`)
    ).toBe(null);

    wrapper.setProps({ placeholder: `bar` });
    expect(
      wrapper
        .find(`textarea`)
        .getDOMNode()
        .getAttribute(`placeholder`)
    ).toBe(`bar`);

    wrapper.setProps({ placeholder: `baz` });
    expect(
      wrapper
        .find(`textarea`)
        .getDOMNode()
        .getAttribute(`placeholder`)
    ).toBe(`baz`);
  });

  it(`Handles props.readonly`, () => {
    expect(
      wrapper
        .find(`textarea`)
        .getDOMNode()
        .getAttribute(`readonly`)
    ).toBe(null);

    wrapper.setProps({ readOnly: true });
    expect(
      wrapper
        .find(`textarea`)
        .getDOMNode()
        .getAttribute(`readonly`)
    ).toBe(``);

    wrapper.setProps({ readOnly: false });
    expect(
      wrapper
        .find(`textarea`)
        .getDOMNode()
        .getAttribute(`readonly`)
    ).toBe(null);
  });

  it(`Handles props.required`, () => {
    expect(
      wrapper
        .find(`textarea`)
        .getDOMNode()
        .getAttribute(`required`)
    ).toBe(null);

    wrapper.setProps({ required: true });
    expect(
      wrapper
        .find(`textarea`)
        .getDOMNode()
        .getAttribute(`required`)
    ).toBe(``);

    wrapper.setProps({ required: false });
    expect(
      wrapper
        .find(`textarea`)
        .getDOMNode()
        .getAttribute(`required`)
    ).toBe(null);
  });

  it(`Handles props.spellCheck`, () => {
    expect(
      wrapper
        .find(`textarea`)
        .getDOMNode()
        .getAttribute(`spellcheck`)
    ).toBe(`true`);

    wrapper.setProps({ spellCheck: false });
    expect(
      wrapper
        .find(`textarea`)
        .getDOMNode()
        .getAttribute(`spellcheck`)
    ).toBe(`false`);

    wrapper.setProps({ spellCheck: true });
    expect(
      wrapper
        .find(`textarea`)
        .getDOMNode()
        .getAttribute(`spellcheck`)
    ).toBe(`true`);
  });

  it(`Handles props.style`, () => {
    wrapper.setState({ height: 50 });
    expect(wrapper.getDOMNode().getAttribute(`style`)).toBe(`height: 90px;`);

    wrapper.setProps({ style: { zIndex: `1` } });
    expect(wrapper.getDOMNode().getAttribute(`style`)).toBe(
      `height: 90px; z-index: 1;`
    );

    wrapper.setProps({ style: { zIndex: `1`, opacity: 0 } });
    expect(wrapper.getDOMNode().getAttribute(`style`)).toBe(
      `height: 90px; z-index: 1; opacity: 0;`
    );
  });

  it(`Handles props.value`, () => {
    wrapper = mount(<Textarea label="foo" />);
    expect(wrapper.find(`textarea`).getDOMNode().value).toBe(``);

    wrapper.unmount();

    wrapper = mount(<Textarea label="foo" maxLength={0} value="bar" />);
    expect(wrapper.find(`textarea`).getDOMNode().value).toBe(`bar`);

    wrapper.unmount();

    wrapper = mount(<Textarea label="foo" maxLength={1} value="bar" />);
    expect(wrapper.find(`textarea`).getDOMNode().value).toBe(`b`);

    wrapper.unmount();

    wrapper = mount(<Textarea label="foo" maxLength={2} value="bar" />);
    expect(wrapper.find(`textarea`).getDOMNode().value).toBe(`ba`);

    wrapper.unmount();

    wrapper = mount(<Textarea label="foo" value="bar" />);
    expect(wrapper.find(`textarea`).getDOMNode().value).toBe(`bar`);
  });

  afterEach(() => {
    wrapper.unmount();
  });
});
