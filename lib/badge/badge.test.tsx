import * as React from 'react';

import Badge from './badge';

import { shallow } from 'enzyme';

describe(`<Badge />`, () => {
  it(`Default`, () => {
    const badge = shallow(<Badge />);

    expect(badge.find(`.oc-badge`).length).toBe(1);
    expect(badge.find(`span`).text()).toBe(`0`);
  });

  it(`Handles props.modifiers`, () => {
    const badge1 = shallow(<Badge modifiers="badge--error" />);
    const badge2 = shallow(<Badge modifiers="badge--success" />);

    expect(badge1.find(`.oc-badge--error`).length).toBe(1);
    expect(badge2.find(`.oc-badge--success`).length).toBe(1);
  });

  it(`Handles props.className`, () => {
    const badge = shallow(
      <Badge modifiers="badge--error" className="foo bar" />
    );

    expect(badge.find(`.oc-badge--error`).length).toBe(1);
    expect(badge.find(`.foo`).length).toBe(1);
    expect(badge.find(`.bar`).length).toBe(1);
  });

  it(`Handles props.style`, () => {
    const badge = shallow(
      <Badge
        modifiers="badge--success"
        className="baz"
        style={{ zIndex: `1` }}
      />
    );

    expect(badge.find(`.oc-badge--success`).length).toBe(1);
    expect(badge.find(`.baz`).length).toBe(1);
    expect(badge.html()).toContain(`style="z-index:1"`);
  });

  it(`Handles props.value`, () => {
    const badge1 = shallow(<Badge value="16 qux" />);
    const badge2 = shallow(<Badge value="10" />);
    const badge3 = shallow(<Badge value={160} />);

    expect(badge1.find(`span`).text()).toBe(`16 qux`);
    expect(badge2.find(`span`).text()).toBe(`9+`);
    expect(badge3.find(`span`).text()).toBe(`99+`);
  });
});
