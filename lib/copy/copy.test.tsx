import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { NAMESPACE } from '../utilities/ts/constants';
import Copy from './copy';

let wrapper: ReactWrapper = null;

describe(`<Copy />`, () => {
  beforeEach(() => {
    wrapper = mount(<Copy>Foo</Copy>);
  });

  it(`Handles props.children`, () => {
    expect(wrapper.text()).toBe(`Foo`);

    wrapper.setProps({ children: `Bar` });
    expect(wrapper.text()).toBe(`Bar`);

    wrapper.setProps({ children: `Baz` });
    expect(wrapper.text()).toBe(`Baz`);
  });

  it(`Handles props.className`, () => {
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(`${NAMESPACE}-p`);

    wrapper.setProps({ className: `foo` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-p foo`
    );

    wrapper.setProps({ className: `foo bar` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-p foo bar`
    );
  });

  it(`Handles props.href`, () => {
    expect(wrapper.getDOMNode().getAttribute(`href`)).toBe(null);

    wrapper.setProps({ href: `https://www.example.com/` });
    expect(wrapper.getDOMNode().getAttribute(`href`)).toBe(null);

    wrapper.setProps({ tag: `a` });
    expect(wrapper.getDOMNode().getAttribute(`href`)).toBe(
      `https://www.example.com/`
    );
  });

  it(`Handles props.modifiers`, () => {
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(`${NAMESPACE}-p`);

    wrapper.setProps({ modifiers: `center` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-p ${NAMESPACE}-p--center`
    );

    wrapper.setProps({ modifiers: `right` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-p ${NAMESPACE}-p--right`
    );
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

  it(`Handles props.tag`, () => {
    expect(wrapper.getDOMNode().nodeName).toBe(`P`);

    wrapper.setProps({ tag: `blockquote` });
    expect(wrapper.getDOMNode().nodeName).toBe(`BLOCKQUOTE`);

    wrapper.setProps({ tag: `kbd` });
    expect(wrapper.getDOMNode().nodeName).toBe(`KBD`);

    wrapper.setProps({ tag: `ol` });
    expect(wrapper.getDOMNode().nodeName).toBe(`OL`);
  });

  it(`Handles props.target`, () => {
    expect(wrapper.getDOMNode().getAttribute(`target`)).toBe(null);

    wrapper.setProps({ target: `_blank` });
    expect(wrapper.getDOMNode().getAttribute(`rel`)).toBe(
      `noopener noreferrer`
    );
    expect(wrapper.getDOMNode().getAttribute(`target`)).toBe(`_blank`);

    wrapper.setProps({ target: `_self` });
    expect(wrapper.getDOMNode().getAttribute(`rel`)).toBe(null);
    expect(wrapper.getDOMNode().getAttribute(`target`)).toBe(`_self`);
  });

  it(`Handles props.title`, () => {
    expect(wrapper.getDOMNode().getAttribute(`title`)).toBe(null);

    wrapper.setProps({ title: `Foo` });
    expect(wrapper.getDOMNode().getAttribute(`title`)).toBe(`Foo`);

    wrapper.setProps({ title: `Bar` });
    expect(wrapper.getDOMNode().getAttribute(`title`)).toBe(`Bar`);
  });

  afterEach(() => {
    wrapper.unmount();
  });
});
