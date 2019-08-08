import * as React from 'react';

import Divider from './divider';

import { mount } from 'enzyme';

let wrapper;

describe('<Divider />', () => {
  beforeEach(() => {
    wrapper = mount(<Divider />);
  });

  it('Handles props.modifiers', () => {
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-divider oc-divider--s'
    );

    wrapper.setProps({ modifiers: 'divider--m' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-divider oc-divider--m'
    );

    wrapper.setProps({ modifiers: 'divider--l' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-divider oc-divider--l'
    );
  });

  it('Handles props.className', () => {
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-divider oc-divider--s'
    );

    wrapper.setProps({ className: 'foo' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-divider oc-divider--s foo'
    );

    wrapper.setProps({ className: 'bar' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-divider oc-divider--s bar'
    );
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

  afterEach(() => {
    wrapper.unmount();
  });
});
