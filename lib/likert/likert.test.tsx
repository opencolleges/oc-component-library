import * as React from 'react';

import Likert from './likert';

import { mount } from 'enzyme';

let wrapper;

describe('<Likert />', () => {
  beforeEach(() => {
    wrapper = mount(<Likert options={[{ label: 'Foo' }, {}, {}]} />);
  });

  it('Handles props.className', () => {
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-likert');

    wrapper.setProps({ className: 'bar' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-likert bar');

    wrapper.setProps({ className: 'bar baz' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-likert bar baz'
    );
  });

  it('Handles props.name', () => {
    expect(
      wrapper
        .find('input')
        .first()
        .getDOMNode()
        .getAttribute('name')
    ).toBe(null);

    wrapper.setProps({ name: 'bar' });
    expect(
      wrapper
        .find('input')
        .first()
        .getDOMNode()
        .getAttribute('name')
    ).toBe('bar');

    wrapper.setProps({ name: 'baz' });
    expect(
      wrapper
        .find('input')
        .first()
        .getDOMNode()
        .getAttribute('name')
    ).toBe('baz');
  });

  it('Handles props.modifiers', () => {
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-likert');

    wrapper.setProps({ modifiers: 'likert--compact' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-likert oc-likert--compact'
    );
  });

  it('Handles props.options', () => {
    expect(wrapper.find('.oc-likert__item').length).toBe(3);
    expect(
      wrapper
        .find('.oc-likert__label')
        .first()
        .text()
    ).toBe('Foo');

    wrapper.unmount();

    wrapper = mount(
      <Likert
        options={[{ label: 'Foo' }, {}, {}, {}, {}, {}, { label: 'Bar' }]}
      />
    );

    expect(wrapper.find('.oc-likert__item').length).toBe(7);
    expect(
      wrapper
        .find('.oc-likert__label')
        .last()
        .text()
    ).toBe('Bar');
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
