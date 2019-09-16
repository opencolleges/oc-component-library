import * as React from 'react';

import Icon from './icon';

import { mount } from 'enzyme';

let wrapper;

describe('<Icon />', () => {
  beforeEach(() => {
    wrapper = mount(<Icon type="arrow-down" />);
  });

  it('Handles props.className', () => {
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-icon oc-icon--arrow-down oc-active'
    );

    wrapper.setProps({ className: 'foo' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-icon oc-icon--arrow-down oc-active foo'
    );

    wrapper.setProps({ className: 'foo bar' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-icon oc-icon--arrow-down oc-active foo bar'
    );
  });

  it('Handles props.size', () => {
    expect(wrapper.getDOMNode().getAttribute('height')).toBe('24px');
    expect(wrapper.getDOMNode().getAttribute('width')).toBe('24px');

    wrapper.setProps({ size: '96px' });
    expect(wrapper.getDOMNode().getAttribute('height')).toBe('96px');
    expect(wrapper.getDOMNode().getAttribute('width')).toBe('96px');

    wrapper.setProps({ size: '120px' });
    expect(wrapper.getDOMNode().getAttribute('height')).toBe('120px');
    expect(wrapper.getDOMNode().getAttribute('width')).toBe('120px');
  });

  it('Handles props.style', () => {
    expect(wrapper.getDOMNode().getAttribute('style')).toBe(null);

    wrapper.setProps({ style: { zIndex: '1' } });
    expect(wrapper.getDOMNode().getAttribute('style')).toBe('z-index: 1;');

    wrapper.setProps({ style: { zIndex: '1', opacity: 0 } });
    expect(wrapper.getDOMNode().getAttribute('style')).toBe(
      'z-index: 1; opacity: 0;'
    );
  });

  it('Handles props.type', () => {
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-icon oc-icon--arrow-down oc-active'
    );

    wrapper.setProps({ type: 'arrow-left' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-icon oc-icon--arrow-left oc-active'
    );

    wrapper.setProps({ type: 'arrow-right' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-icon oc-icon--arrow-right oc-active'
    );

    wrapper.setProps({ type: 'arrow-up' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-icon oc-icon--arrow-up oc-active'
    );
  });

  it('Handles props.visible', () => {
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-icon oc-icon--arrow-down oc-active'
    );

    wrapper.setProps({ visible: false });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-icon oc-icon--arrow-down'
    );

    wrapper.setProps({ visible: true });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-icon oc-icon--arrow-down oc-active'
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });
});
