import { NAMESPACE } from '../../utilities/ts/constants';
import getLikertScale from './get-likert-scale';

describe(`getLikertScale()`, () => {
  it(`Handles an empty array argument`, () => {
    expect(getLikertScale([])).toMatchObject([
      { id: `${NAMESPACE}-1`, label: `` },
      { id: `${NAMESPACE}-2`, label: `` },
      { id: `${NAMESPACE}-3`, label: `` }
    ]);
  });

  it(`Handles an array argument w/ five indexes`, () => {
    expect(
      getLikertScale([
        { label: `Foo` },
        {},
        { label: `Bar` },
        { label: `Baz` },
        {}
      ])
    ).toMatchObject([
      { id: `${NAMESPACE}-4`, label: `Foo` },
      { id: `${NAMESPACE}-5`, label: `` },
      { id: `${NAMESPACE}-6`, label: `Bar` },
      { id: `${NAMESPACE}-7`, label: `Baz` },
      { id: `${NAMESPACE}-8`, label: `` }
    ]);
  });

  it(`Handles an array argument w/ six indexes`, () => {
    expect(
      getLikertScale([
        { label: `Foo` },
        { label: `Bar` },
        {},
        {},
        { label: `Baz` },
        { label: `Qui` }
      ])
    ).toMatchObject([
      { id: `${NAMESPACE}-9`, label: `Foo` },
      { id: `${NAMESPACE}-10`, label: `Bar` },
      { id: `${NAMESPACE}-11`, label: `` },
      { id: `${NAMESPACE}-12`, label: `` },
      { id: `${NAMESPACE}-13`, label: `Baz` },
      { id: `${NAMESPACE}-14`, label: `Qui` }
    ]);
  });

  it(`Handles an array argument w/ 12 indexes`, () => {
    expect(
      getLikertScale([
        { label: `Foo` },
        {},
        {},
        { label: `Bar` },
        { label: `Baz` },
        {},
        {},
        {},
        { label: `Qui` },
        {},
        { label: `Qux` },
        {}
      ])
    ).toMatchObject([
      { id: `${NAMESPACE}-15`, label: `Foo` },
      { id: `${NAMESPACE}-16`, label: `` },
      { id: `${NAMESPACE}-17`, label: `` },
      { id: `${NAMESPACE}-18`, label: `Bar` },
      { id: `${NAMESPACE}-19`, label: `Baz` },
      { id: `${NAMESPACE}-20`, label: `` },
      { id: `${NAMESPACE}-21`, label: `` },
      { id: `${NAMESPACE}-22`, label: `` },
      { id: `${NAMESPACE}-23`, label: `Qui` },
      { id: `${NAMESPACE}-24`, label: `` },
      { id: `${NAMESPACE}-25`, label: `Qux` }
    ]);
  });
});
