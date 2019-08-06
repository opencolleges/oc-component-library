import * as React from 'react';

import { mount } from 'enzyme';

import Badge from '../badge';
import Avatar from './avatar';

const Props = {
  className: 'testClass',
  firstName: 'name',
  href: 'google.com',
  image: 'imageURL',
  modifiers: 'avatar--success',
  style: {
    zIndex: 1
  },
  value: 10
};

describe('<Avatar />', () => {
  describe('default', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(<Avatar firstName="test" sex="male" />);
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should render component with default props', () => {
      expect(wrapper.getDOMNode().nodeName).toBe('DIV');
      expect(wrapper.find('.oc-avatar__image').length).toBe(1);
      expect(wrapper.find('svg').length).toBe(0);
      expect(wrapper.find('[title="test"]').length).toBe(1);
    });
  });

  // describe('with props', () => {
  //   let wrapper;

  //   beforeEach(() => {
  //     wrapper = mount(<Avatar {...Props} sex="male"></Avatar>);
  //   });

  //   afterEach(() => {
  //     Props.onClick.mockClear();
  //     wrapper.unmount();
  //   });

  //   it('should render button component ', () => {
  //     expect(wrapper.find('button').length).toBe(1);
  //     expect(wrapper.text()).toBe('test');
  //   });

  //   it('should render icon component', () => {
  //     expect(wrapper.find(Badge).length).toBe(1);
  //   });

  //   it('should handle id, class name and modifiers props', () => {
  //     expect(wrapper.find('.testClass').hostNodes().length).toBe(1);
  //     expect(wrapper.find('.oc-button--success').length).toBe(1);
  //     expect(wrapper.find('#btn-1').hostNodes().length).toBe(1);
  //   });

  //   it('should handle type and name props ', () => {
  //     expect(wrapper.find('[type="submit"]').hostNodes().length).toBe(1);
  //     expect(wrapper.find('[name="button-name"]').hostNodes().length).toBe(1);
  //   });

  //   it('should handle style props ', () => {
  //     expect(wrapper.getDOMNode().getAttribute('style')).toBe('z-index: 1;');
  //   });

  //   it('should handle onclick  ', () => {
  //     const button = wrapper.find('button');
  //     button.simulate('click');
  //     expect(Props.onClick).toHaveBeenCalledTimes(1);
  //   });

  //   it('should handle disable props ', () => {
  //     wrapper.setProps({ disabled: true });
  //     const button = wrapper.find('button');
  //     button.simulate('click');
  //     expect(Props.onClick).toHaveBeenCalledTimes(0);
  //     expect(wrapper.getDOMNode().getAttribute('disabled')).toBe('');
  //   });

  //   it('should render a tag ', () => {
  //     wrapper.setProps({ href: 'google.com' });
  //     expect(wrapper.find('a').length).toBe(1);
  //     expect(wrapper.find('button').length).toBe(0);
  //     expect(wrapper.getDOMNode().getAttribute('href')).toBe('google.com');
  //   });
  //   it('should render button if disabled true and href passes ', () => {
  //     wrapper.setProps({ href: 'google.com' });
  //     wrapper.setProps({ disabled: true });
  //     expect(wrapper.find('a').length).toBe(0);
  //     expect(wrapper.find('button').length).toBe(1);
  //   });
  // });
});
