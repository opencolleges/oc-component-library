import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { NAMESPACE } from '../utilities/ts/constants';
import Pagination, { PageInterface } from './pagination';

let wrapper: ReactWrapper = null;

describe(`<Pagination />`, () => {
  beforeEach(() => {
    wrapper = mount(
      <Pagination
        pages={[
          {
            modifiers: `pagination__item--required`,
            number: 1
          },
          {
            modifiers: `pagination__item--populated`,
            number: 2
          },
          {
            number: 3
          },
          {
            number: 4
          },
          {
            modifiers: `pagination__item--required`,
            number: 5
          },
          {
            number: 6
          },
          {
            modifiers: `pagination__item--populated`,
            number: 7
          },
          {
            number: 8
          },
          {
            number: 9
          },
          {
            modifiers: `pagination__item--required`,
            number: 10
          },
          {
            number: 11
          },
          {
            modifiers: `pagination__item--populated`,
            number: 12
          },
          {
            modifiers: `pagination__item--required`,
            number: 13
          }
        ]}
      />
    );
  });

  it(`Handles props.className`, () => {
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-pagination`
    );

    wrapper.setProps({ className: `foo` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-pagination foo`
    );

    wrapper.setProps({ className: `foo bar` });
    expect(wrapper.getDOMNode().getAttribute(`class`)).toBe(
      `${NAMESPACE}-pagination foo bar`
    );
  });

  it(`Handles props.currentPage`, () => {
    expect(wrapper.state(`currentPage`)).toBe(1);

    wrapper.setProps({ currentPage: 1 });
    expect(wrapper.state(`currentPage`)).toBe(1);

    wrapper.setProps({ currentPage: 2 });
    expect(wrapper.state(`currentPage`)).toBe(2);
  });

  it(`Handles handleClick()`, () => {
    wrapper
      .find(`.${NAMESPACE}-pagination__item[data-page-number=2]`)
      .simulate(`click`);
    expect(wrapper.state(`currentPage`)).toBe(2);

    wrapper
      .find(`.${NAMESPACE}-pagination__item[data-page-number=3]`)
      .simulate(`click`);
    expect(wrapper.state(`currentPage`)).toBe(3);

    wrapper
      .find(`.${NAMESPACE}-pagination__item[data-page-number=4]`)
      .simulate(`click`);
    expect(wrapper.state(`currentPage`)).toBe(4);
  });

  it(`Handles handleKeyDown()`, () => {
    wrapper
      .find(`.${NAMESPACE}-pagination__item.active`)
      .simulate(`keydown`, { keyCode: 38 });
    expect(wrapper.state(`currentPage`)).toBe(13);

    wrapper.setProps({ currentPage: 13 });
    wrapper
      .find(`.${NAMESPACE}-pagination__item.active`)
      .simulate(`keydown`, { keyCode: 40 });
    expect(wrapper.state(`currentPage`)).toBe(1);

    wrapper.setProps({ currentPage: 2 });
    wrapper
      .find(`.${NAMESPACE}-pagination__item.active`)
      .simulate(`keydown`, { keyCode: 39 });
    expect(wrapper.state(`currentPage`)).toBe(3);
    wrapper
      .find(`.${NAMESPACE}-pagination__item.active`)
      .simulate(`keydown`, { keyCode: 39 });
    expect(wrapper.state(`currentPage`)).toBe(4);
    wrapper
      .find(`.${NAMESPACE}-pagination__item.active`)
      .simulate(`keydown`, { keyCode: 39 });
    expect(wrapper.state(`currentPage`)).toBe(5);

    wrapper.setProps({ currentPage: 5 });
    wrapper
      .find(`.${NAMESPACE}-pagination__item.active`)
      .simulate(`keydown`, { keyCode: 37 });
    expect(wrapper.state(`currentPage`)).toBe(4);
    wrapper
      .find(`.${NAMESPACE}-pagination__item.active`)
      .simulate(`keydown`, { keyCode: 37 });
    expect(wrapper.state(`currentPage`)).toBe(3);
    wrapper
      .find(`.${NAMESPACE}-pagination__item.active`)
      .simulate(`keydown`, { keyCode: 37 });
    expect(wrapper.state(`currentPage`)).toBe(2);
  });

  it(`Handles handleNext()`, () => {
    const nextButton = wrapper.find(`.${NAMESPACE}-pagination__item--next`);

    wrapper.setProps({ currentPage: 3 });
    nextButton.simulate(`click`);
    expect(wrapper.state(`currentPage`)).toBe(4);

    wrapper.setProps({ currentPage: 4 });
    nextButton.simulate(`click`);
    expect(wrapper.state(`currentPage`)).toBe(5);

    wrapper.setProps({ currentPage: 5 });
    nextButton.simulate(`click`);
    expect(wrapper.state(`currentPage`)).toBe(6);
  });

  it(`Handles handlePrevious()`, () => {
    const prevButton = wrapper.find(`.${NAMESPACE}-pagination__item--previous`);

    wrapper.setProps({ currentPage: 3 });
    prevButton.simulate(`click`);
    expect(wrapper.state(`currentPage`)).toBe(2);

    wrapper.setProps({ currentPage: 4 });
    prevButton.simulate(`click`);
    expect(wrapper.state(`currentPage`)).toBe(3);

    wrapper.setProps({ currentPage: 5 });
    prevButton.simulate(`click`);
    expect(wrapper.state(`currentPage`)).toBe(4);
  });

  it(`Handles props.pages`, () => {
    let pages: PageInterface[] = [];

    pages = wrapper.state(`pages`);
    expect(pages.length).toBe(13);

    wrapper.unmount();

    wrapper = mount(
      <Pagination
        pages={[
          {
            modifiers: `pagination__item--required`,
            number: 1
          },
          {
            modifiers: `pagination__item--populated`,
            number: 2
          }
        ]}
      />
    );
    pages = wrapper.state(`pages`);
    expect(pages.length).toBe(2);

    wrapper.unmount();

    wrapper = mount(
      <Pagination
        pages={[
          {
            modifiers: `pagination__item--required`,
            number: 1
          },
          {
            modifiers: `pagination__item--populated`,
            number: 2
          },
          {
            number: 3
          },
          {
            number: 4
          }
        ]}
      />
    );
    pages = wrapper.state(`pages`);
    expect(pages.length).toBe(4);

    wrapper.unmount();

    wrapper = mount(
      <Pagination
        pages={[
          {
            modifiers: `pagination__item--required`,
            number: 1
          },
          {
            modifiers: `pagination__item--populated`,
            number: 2
          },
          {
            number: 3
          },
          {
            number: 4
          },
          {
            modifiers: `pagination__item--required`,
            number: 5
          },
          {
            number: 6
          },
          {
            modifiers: `pagination__item--populated`,
            number: 7
          },
          {
            number: 8
          }
        ]}
      />
    );
    pages = wrapper.state(`pages`);
    expect(pages.length).toBe(8);
  });

  it(`Handles props.style`, () => {
    expect(wrapper.getDOMNode().getAttribute(`style`)).toBe(null);

    wrapper.setProps({
      style: { zIndex: `1` }
    });
    expect(wrapper.getDOMNode().getAttribute(`style`)).toBe(`z-index: 1;`);

    wrapper.setProps({
      style: { zIndex: `1`, opacity: 0 }
    });
    expect(wrapper.getDOMNode().getAttribute(`style`)).toBe(
      `z-index: 1; opacity: 0;`
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });
});
