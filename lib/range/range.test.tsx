import * as React from 'react';

import Range from './range';

import { mount } from 'enzyme';

let wrapper;

describe('<Range />', () => {
  beforeEach(() => {
    wrapper = mount(<Range />);
  });

  it('Handles props.className', () => {
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-range');

    wrapper.setProps({ className: 'foo' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-range foo');

    wrapper.setProps({ className: 'foo bar' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-range foo bar');
  });

  it('Handles props.id', () => {
    expect(
      wrapper
        .find('input')
        .getDOMNode()
        .getAttribute('id')
    ).toBe('oc-2');

    wrapper.unmount();

    wrapper = mount(<Range />);
    expect(
      wrapper
        .find('input')
        .getDOMNode()
        .getAttribute('id')
    ).toBe('oc-3');

    wrapper.unmount();

    wrapper = mount(<Range id="bar" />);
    expect(
      wrapper
        .find('input')
        .getDOMNode()
        .getAttribute('id')
    ).toBe('bar');
  });

  it('Handles props.label', () => {
    expect(wrapper.find('label').text()).toBe('');

    wrapper.setProps({ label: 'Bar' });
    expect(wrapper.find('label').text()).toBe('Bar');

    wrapper.setProps({ label: 'Bar baz' });
    expect(wrapper.find('label').text()).toBe('Bar baz');
  });

  it('Handles props.max', () => {
    expect(
      wrapper
        .find('input')
        .getDOMNode()
        .getAttribute('max')
    ).toBe('100');

    wrapper.unmount();

    wrapper = mount(<Range max={220} />);
    expect(
      wrapper
        .find('input')
        .getDOMNode()
        .getAttribute('max')
    ).toBe('220');
    expect(
      wrapper
        .find('input')
        .getDOMNode()
        .getAttribute('value')
    ).toBe('110');

    wrapper.unmount();

    wrapper = mount(<Range max={86} />);
    expect(
      wrapper
        .find('input')
        .getDOMNode()
        .getAttribute('max')
    ).toBe('86');
    expect(
      wrapper
        .find('input')
        .getDOMNode()
        .getAttribute('value')
    ).toBe('43');
  });

  it('Handles props.min', () => {
    expect(
      wrapper
        .find('input')
        .getDOMNode()
        .getAttribute('min')
    ).toBe('0');

    wrapper.unmount();

    wrapper = mount(<Range min={80} />);
    expect(
      wrapper
        .find('input')
        .getDOMNode()
        .getAttribute('min')
    ).toBe('80');
    expect(
      wrapper
        .find('input')
        .getDOMNode()
        .getAttribute('value')
    ).toBe('90');

    wrapper.unmount();

    wrapper = mount(<Range min={12} />);
    expect(
      wrapper
        .find('input')
        .getDOMNode()
        .getAttribute('min')
    ).toBe('12');
    expect(
      wrapper
        .find('input')
        .getDOMNode()
        .getAttribute('value')
    ).toBe('56');
  });

  it('Handles props.name', () => {
    expect(
      wrapper
        .find('input')
        .getDOMNode()
        .getAttribute('name')
    ).toBe(null);

    wrapper.setProps({ name: 'bar' });
    expect(
      wrapper
        .find('input')
        .getDOMNode()
        .getAttribute('name')
    ).toBe('bar');

    wrapper.setProps({ name: 'baz' });
    expect(
      wrapper
        .find('input')
        .getDOMNode()
        .getAttribute('name')
    ).toBe('baz');
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

  it('Handles props.value', () => {
    expect(
      wrapper
        .find('input')
        .getDOMNode()
        .getAttribute('value')
    ).toBe('50');

    wrapper.setProps({ value: '100' });
    expect(
      wrapper
        .find('input')
        .getDOMNode()
        .getAttribute('value')
    ).toBe('100');

    wrapper.setProps({ value: '0' });
    expect(
      wrapper
        .find('input')
        .getDOMNode()
        .getAttribute('value')
    ).toBe('0');
  });

  afterEach(() => {
    wrapper.unmount();
  });
});
