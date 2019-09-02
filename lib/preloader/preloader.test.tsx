import * as React from 'react';

import Preloader from './preloader';

import { mount } from 'enzyme';

let wrapper;

describe('<Preloader />', () => {
  beforeEach(() => {
    wrapper = mount(<Preloader />);
  });

  it('Handles props.active', () => {
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-preloader');

    wrapper.setProps({ active: true });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-preloader oc-active'
    );

    wrapper.setProps({ active: false });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-preloader');
  });

  it('Handles props.className', () => {
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-preloader');

    wrapper.setProps({ className: 'foo' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-preloader foo');

    wrapper.setProps({ className: 'foo bar' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-preloader foo bar'
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
