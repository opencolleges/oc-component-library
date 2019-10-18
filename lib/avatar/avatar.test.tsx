import React from 'react';

import { mount } from 'enzyme';

import Badge from '../badge';
import Avatar from './avatar';

import { NAMESPACE } from '../utilities/ts/constants';

const Props = {
  className: `testClass`,
  firstName: `name`,
  image: `imageURL`,
  modifiers: `avatar--m avatar--success`,
  style: {
    zIndex: 1
  },
  value: 6
};

describe(`<Avatar />`, () => {
  describe(`default`, () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(<Avatar firstName="test" sex="male" />);
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it(`should render component with default props`, () => {
      expect(wrapper.getDOMNode().nodeName).toBe(`DIV`);
      expect(wrapper.getDOMNode().childNodes[0].className).toMatch(
        `avatar__image--male-`
      );
      expect(wrapper.find(`.${NAMESPACE}-avatar__image`).length).toBe(1);
      expect(wrapper.find(`svg`).length).toBe(0);
      expect(wrapper.find(`[title="test"]`).length).toBe(1);
      expect(wrapper.find(Badge).length).toBe(0);
      expect(wrapper.getDOMNode().nodeName).toBe(`DIV`);
    });
  });

  describe(`with props`, () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<Avatar {...Props} sex="female" />);
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it(`should render avatar component `, () => {
      expect(wrapper.find(`svg`).length).toBe(0);
      expect(wrapper.find(Badge).length).toBe(1);
      expect(wrapper.getDOMNode().nodeName).toBe(`DIV`);
    });

    it(`should render Badge component`, () => {
      expect(wrapper.find(Badge).length).toBe(1);
      expect(wrapper.find(Badge).text()).toBe(`6`);
    });

    it(`should handle class name and modifiers props`, () => {
      expect(wrapper.find(`.testClass`).hostNodes().length).toBe(1);
      expect(wrapper.find(`.${NAMESPACE}-avatar--m`).length).toBe(1);
    });

    it(`should handle style props `, () => {
      expect(wrapper.getDOMNode().getAttribute(`style`)).toBe(`z-index: 1;`);
    });

    it(`should render a tag `, () => {
      wrapper.setProps({ href: `google.com` });
      expect(wrapper.find(`svg`).length).toBe(1);
      expect(wrapper.find(`a`).length).toBe(1);
      expect(wrapper.getDOMNode().getAttribute(`href`)).toBe(`google.com`);
    });
  });
});
