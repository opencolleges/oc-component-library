import React from 'react';

import Select from './select';

import { mount } from 'enzyme';

let wrapper;

describe('<Select />', () => {
  beforeEach(() => {
    wrapper = mount(<Select label="foo" />);
  });

  it('Handles props.className', () => {
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-select');

    wrapper.setProps({ className: 'foo' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-select foo');

    wrapper.setProps({ className: 'foo bar' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-select foo bar'
    );
  });

  it('Handles props.disabled', () => {
    expect(
      wrapper
        .find('input')
        .getDOMNode()
        .getAttribute('disabled')
    ).toBe(null);

    wrapper.setProps({ disabled: true });
    expect(
      wrapper
        .find('input')
        .getDOMNode()
        .getAttribute('disabled')
    ).toBe('');

    wrapper.setProps({ disabled: false });
    expect(
      wrapper
        .find('input')
        .getDOMNode()
        .getAttribute('disabled')
    ).toBe(null);
  });

  it('Handles props.id', () => {
    expect(
      wrapper
        .find('input')
        .getDOMNode()
        .getAttribute('id')
    ).toBe('oc-3');

    wrapper.unmount();

    wrapper = mount(<Select label="foo" />);
    expect(
      wrapper
        .find('input')
        .getDOMNode()
        .getAttribute('id')
    ).toBe('oc-4');

    wrapper.unmount();

    wrapper = mount(<Select label="foo" id="bar" />);
    expect(
      wrapper
        .find('input')
        .getDOMNode()
        .getAttribute('id')
    ).toBe('bar');
  });

  it('Handles props.label', () => {
    expect(wrapper.find('label').text()).toBe('foo');

    wrapper.setProps({ label: 'Bar' });
    expect(wrapper.find('label').text()).toBe('Bar');

    wrapper.setProps({ label: 'Bar baz' });
    expect(wrapper.find('label').text()).toBe('Bar baz');
  });

  it('Handles props.message', () => {
    wrapper.setProps({ error: ['foo'] });
    expect(wrapper.find('span.oc-select__message').length).toBe(0);

    wrapper.setProps({ message: 'Qux' });
    expect(wrapper.find('span.oc-select__message').length).toBe(1);
    expect(wrapper.find('span.oc-select__message').text()).toBe('Qux');

    wrapper.setProps({ error: [] });
    wrapper.setProps({ message: '' });
    expect(wrapper.find('span.oc-select__message').length).toBe(0);

    wrapper.setProps({ success: ['bar'] });
    wrapper.setProps({ message: 'Corge' });
    expect(wrapper.find('span.oc-select__message').length).toBe(1);
    expect(wrapper.find('span.oc-select__message').text()).toBe('Corge');
  });

  it('Handles props.modifiers', () => {
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-select');

    wrapper.setProps({ modifiers: 'error' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-select oc-select--error'
    );

    wrapper.setProps({ modifiers: 'success' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-select oc-select--success'
    );
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

  it('Handles props.options', () => {
    wrapper = mount(
      <Select
        label="foo"
        options={[
          { label: 'Bar', value: 'bar' },
          { label: 'Foo', value: 'foo' }
        ]}
      />
    );

    expect(wrapper.find('.oc-select__item').length).toBe(2);
    expect(
      wrapper
        .find('.oc-select__item')
        .first()
        .text()
    ).toBe('Bar');
    expect(
      wrapper
        .find('.oc-select__item')
        .first()
        .getDOMNode()
        .getAttribute('data-item')
    ).toBe('bar');

    wrapper.unmount();

    wrapper = mount(
      <Select
        label="foo"
        options={[
          { label: 'Foo', value: 'foo' },
          { label: 'Bar', value: 'bar' }
        ]}
      />
    );

    expect(wrapper.find('.oc-select__item').length).toBe(2);
    expect(
      wrapper
        .find('.oc-select__item')
        .first()
        .text()
    ).toBe('Foo');
    expect(
      wrapper
        .find('.oc-select__item')
        .first()
        .getDOMNode()
        .getAttribute('data-item')
    ).toBe('foo');
  });

  it('Handles props.readonly', () => {
    expect(
      wrapper
        .find('input')
        .getDOMNode()
        .getAttribute('readonly')
    ).toBe(null);

    wrapper.setProps({ readOnly: true });
    expect(
      wrapper
        .find('input')
        .getDOMNode()
        .getAttribute('readonly')
    ).toBe('');

    wrapper.setProps({ readOnly: false });
    expect(
      wrapper
        .find('input')
        .getDOMNode()
        .getAttribute('readonly')
    ).toBe(null);
  });

  it('Handles props.required', () => {
    expect(
      wrapper
        .find('input')
        .getDOMNode()
        .getAttribute('required')
    ).toBe(null);

    wrapper.setProps({ required: true });
    expect(
      wrapper
        .find('input')
        .getDOMNode()
        .getAttribute('required')
    ).toBe('');

    wrapper.setProps({ required: false });
    expect(
      wrapper
        .find('input')
        .getDOMNode()
        .getAttribute('required')
    ).toBe(null);
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
    wrapper = mount(
      <Select
        label="foo"
        options={[
          { label: 'Bar', value: 'bar' },
          { label: 'Foo', value: 'foo' }
        ]}
        value="bar"
      />
    );
    expect(
      wrapper
        .find('.oc-icon')
        .at(1)
        .getDOMNode()
        .getAttribute('class')
    ).toBe('oc-icon oc-icon--tick active');
    expect(wrapper.find('input').getDOMNode().value).toBe('bar');
  });

  it('Handles onKeyDown', () => {
    wrapper = mount(
      <Select
        label="foo"
        options={[
          { label: 'Bar', value: 'bar' },
          { label: 'Foo', value: 'foo' }
        ]}
      />
    );

    // Space key on select
    wrapper.setState({ active: false });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-select');

    wrapper.find('span.oc-select__input').simulate('keydown', { keyCode: 32 });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-select active');

    // Arrow up on select
    wrapper.setState({ active: false });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-select');

    wrapper.find('span.oc-select__input').simulate('keydown', { keyCode: 38 });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-select active');

    // Arrow down on select
    wrapper.setState({ active: false });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-select');

    wrapper.find('span.oc-select__input').simulate('keydown', { keyCode: 40 });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-select active');

    // Space key on option
    wrapper.setState({ active: true });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-select active');

    wrapper
      .find('.oc-select__item')
      .first()
      .simulate('keydown', { keyCode: 32 });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-select selected'
    );
    expect(wrapper.find('input').getDOMNode().value).toBe('bar');

    // Enter key on option
    wrapper.setState({ active: true, value: '' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-select active');

    wrapper
      .find('.oc-select__item')
      .first()
      .simulate('keydown', { keyCode: 13 });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-select selected'
    );
    expect(wrapper.find('input').getDOMNode().value).toBe('bar');

    // Esc key to close select
    wrapper.setState({ active: true, value: '' });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-select active');

    wrapper
      .find('.oc-select__item')
      .first()
      .simulate('keydown', { keyCode: 27 });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-select');
  });

  it('Handles onMouseDown', () => {
    wrapper = mount(
      <Select
        label="foo"
        options={[
          { label: 'Bar', value: 'bar' },
          { label: 'Foo', value: 'foo' }
        ]}
      />
    );

    // Select opened
    wrapper.setState({ active: true });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-select active');

    wrapper.find('span.oc-select__input').simulate('mousedown');
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-select');

    // Select closed
    wrapper.setState({ active: false });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-select');

    wrapper.find('span.oc-select__input').simulate('mousedown');
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-select active');

    // Select opened with click on option
    wrapper.setState({ active: true });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-select active');

    wrapper
      .find('.oc-select__item')
      .first()
      .simulate('mousedown');
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-select selected'
    );
    expect(wrapper.find('input').getDOMNode().value).toBe('bar');
  });

  it('Handles onTouchEnd', () => {
    wrapper = mount(
      <Select
        label="foo"
        options={[
          { label: 'Bar', value: 'bar' },
          { label: 'Foo', value: 'foo' }
        ]}
      />
    );

    // Select opened
    wrapper.setState({ active: true });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-select active');

    wrapper.find('span.oc-select__input').simulate('touchend');
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-select');

    // Select closed
    wrapper.setState({ active: false });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-select');

    wrapper.find('span.oc-select__input').simulate('touchend');
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-select active');

    // Select opened with click on option
    wrapper.setState({ active: true });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-select active');

    wrapper
      .find('.oc-select__item')
      .first()
      .simulate('touchend');
    expect(wrapper.getDOMNode().getAttribute('class')).toBe(
      'oc-select selected'
    );
    expect(wrapper.find('input').getDOMNode().value).toBe('bar');
  });

  it('Handles onBlur', () => {
    wrapper = mount(
      <Select
        label="foo"
        options={[
          { label: 'Bar', value: 'bar' },
          { label: 'Foo', value: 'foo' }
        ]}
      />
    );

    wrapper.setState({ active: true });
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-select active');

    wrapper
      .find('.oc-select__item')
      .first()
      .simulate('blur');
    expect(wrapper.getDOMNode().getAttribute('class')).toBe('oc-select');
  });

  afterEach(() => {
    wrapper.unmount();
  });
});
