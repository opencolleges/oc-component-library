import * as React from 'react';

import { mount } from 'enzyme';

import Button from './button';
import Icon from '../icon';

const Props = {
  id: 'btn-1',
  name: 'button-name',
  className: 'testClass',
  modifiers: 'button--success',
  action: 'test',
  style: {
    zIndex: 1
  },
  onClick: jest.fn(),
  disable: false
};

describe('<Button />', () => {
  describe('default', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(<Button action="submit"></Button>);
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should render component with default props', () => {
      expect(wrapper.find('button').length).toBe(1);
      expect(wrapper.text()).toBe('submit');
      expect(wrapper.getDOMNode().getAttribute('id')).toMatch('oc-');
      expect(wrapper.getDOMNode().getAttribute('disable')).toBe(null);
    });
  });

  describe('with props', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <Button icon="arrow-up" type="submit" {...Props}></Button>
      );
    });

    afterEach(() => {
      Props.onClick.mockClear();
      wrapper.unmount();
    });

    it('should render button component ', () => {
      expect(wrapper.find('button').length).toBe(1);
      expect(wrapper.text()).toBe('test');
    });

    it('should render icon component', () => {
      expect(wrapper.find(Icon).length).toBe(1);
    });

    it('should handle id, class name and modifiers props', () => {
      expect(wrapper.find('.testClass').hostNodes().length).toBe(1);
      expect(wrapper.find('.oc-button--success').length).toBe(1);
      expect(wrapper.find('#btn-1').hostNodes().length).toBe(1);
    });

    it('should handle type and name props ', () => {
      expect(wrapper.find('[type="submit"]').hostNodes().length).toBe(1);
      expect(wrapper.find('[name="button-name"]').hostNodes().length).toBe(1);
    });

    it('should handle style props ', () => {
      expect(wrapper.getDOMNode().getAttribute('style')).toBe('z-index: 1;');
    });

    it('should handle onclick  ', () => {
      const button = wrapper.find('button');
      button.simulate('click');
      expect(Props.onClick).toHaveBeenCalledTimes(1);
    });

    it('should handle disable props ', () => {
      wrapper.setProps({ disabled: true });
      const button = wrapper.find('button');
      button.simulate('click');
      expect(Props.onClick).toHaveBeenCalledTimes(0);
      expect(wrapper.getDOMNode().getAttribute('disabled')).toBe('');
    });

    it('should render a tag ', () => {
      wrapper.setProps({ href: 'google.com' });
      expect(wrapper.find('a').length).toBe(1);
      expect(wrapper.find('button').length).toBe(0);
      expect(wrapper.getDOMNode().getAttribute('href')).toBe('google.com');
    });
    it('should render button if disabled true and href passes ', () => {
      wrapper.setProps({ href: 'google.com' });
      wrapper.setProps({ disabled: true });
      expect(wrapper.find('a').length).toBe(0);
      expect(wrapper.find('button').length).toBe(1);
    });
  });
});
