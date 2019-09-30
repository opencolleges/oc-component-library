import * as React from 'react';

import Progress from './progress';

import { mount } from 'enzyme';

let wrapper;

describe('<Progress />', () => {
  beforeEach(() => {
    wrapper = mount(<Progress progress={0} />);
  });

  it('Handles props.className', () => {
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-progress');

    wrapper.setProps({ className: 'foo' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-progress foo');

    wrapper.setProps({ className: 'foo bar' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-progress foo bar'
    );
  });

  it('Handles props.message', () => {
    expect(wrapper.find('.oc-progress__label').text()).toBe('0%');

    wrapper.setProps({ message: 'foo' });
    expect(wrapper.find('.oc-progress__label').text()).toBe('foo');

    wrapper.setProps({ message: 'bar', modifiers: 'alt' });
    expect(wrapper.find('.oc-progress__label').text()).toBe('bar');
  });

  it('Handles props.modifiers', () => {
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-progress');

    wrapper.setProps({ modifiers: 'alt' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-progress oc-progress--alt'
    );

    wrapper.setProps({ modifiers: 'alt error' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-progress oc-progress--alt oc-progress--error'
    );

    wrapper.setProps({ modifiers: 'success' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-progress oc-progress--success'
    );
  });

  it('Handles props.progress', () => {
    expect(wrapper.find('.oc-progress__label').text()).toBe('0%');

    wrapper.setProps({ progress: 50 });
    expect(wrapper.find('.oc-progress__label').text()).toBe('50%');

    wrapper.setProps({ modifiers: 'alt', progress: 20 });
    expect(wrapper.find('.oc-progress__label').text()).toBe('20 of 100');

    wrapper.setProps({ progress: 60 });
    expect(wrapper.find('.oc-progress__label').text()).toBe('60 of 100');
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

  it('Handles props.totalProgress', () => {
    expect(wrapper.find('.oc-progress__label').text()).toBe('0%');

    wrapper.setProps({ progress: 50 });
    expect(wrapper.find('.oc-progress__label').text()).toBe('50%');

    wrapper.setProps({ modifiers: 'alt', progress: 1, totalProgress: 10 });
    expect(wrapper.find('.oc-progress__label').text()).toBe('1 of 10');

    wrapper.setProps({ totalProgress: 12 });
    expect(wrapper.find('.oc-progress__label').text()).toBe('1 of 12');
  });

  afterEach(() => {
    wrapper.unmount();
  });
});
