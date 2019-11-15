import React from 'react';

import { NAMESPACE } from '../utilities/ts/constants';
import OptionalCard from './_optional-card';

import { mount } from 'enzyme';

let wrapper;

describe(`<OptionalCard />`, () => {
  beforeEach(() => {
    wrapper = mount(<OptionalCard>Foo</OptionalCard>);
  });

  it(`Handles props.children`, () => {
    expect(wrapper.text()).toBe(`Foo`);

    wrapper.setProps({ children: `Bar` });
    expect(wrapper.text()).toBe(`Bar`);

    wrapper.setProps({ children: `Baz` });
    expect(wrapper.text()).toBe(`Baz`);
  });

  it(`Handles props.disabled`, () => {
    wrapper.setProps({ visible: true });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-card ${NAMESPACE}-card--s ${NAMESPACE}-card--clickable`
    );

    wrapper.setProps({ disabled: true });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-card ${NAMESPACE}-card--s ${NAMESPACE}-card--layer-1`
    );

    wrapper.setProps({ disabled: false });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-card ${NAMESPACE}-card--s ${NAMESPACE}-card--clickable`
    );
  });

  it(`Handles props.readOnly`, () => {
    wrapper.setProps({ visible: true });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-card ${NAMESPACE}-card--s ${NAMESPACE}-card--clickable`
    );

    wrapper.setProps({ readOnly: true });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-card ${NAMESPACE}-card--s ${NAMESPACE}-card--layer-1`
    );

    wrapper.setProps({ readOnly: false });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-card ${NAMESPACE}-card--s ${NAMESPACE}-card--clickable`
    );
  });

  it(`Handles props.visible`, () => {
    expect(wrapper.find(`.${NAMESPACE}-card`).length).toBe(0);

    wrapper.setProps({ visible: true });
    expect(wrapper.find(`.${NAMESPACE}-card`).length).toBe(1);

    wrapper.setProps({ visible: false });
    expect(wrapper.find(`.${NAMESPACE}-card`).length).toBe(0);
  });

  afterEach(() => {
    wrapper.unmount();
  });
});
