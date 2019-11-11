import addId from './add-id';

import { NAMESPACE } from '../../utilities/ts/constants';

describe(`addId()`, () => {
  it(`Handles an array of objects without id keys`, () => {
    expect(addId([{ heading: `foo`, message: `bar` }])).toMatchObject([
      { heading: `foo`, id: `${NAMESPACE}-1`, message: `bar` }
    ]);
    expect(
      addId([
        { heading: `baz`, message: `qui` },
        { heading: `qux`, message: `thud` }
      ])
    ).toMatchObject([
      { heading: `baz`, id: `${NAMESPACE}-2`, message: `qui` },
      { heading: `qux`, id: `${NAMESPACE}-3`, message: `thud` }
    ]);
  });

  it(`Handles an array of objects with id keys`, () => {
    expect(
      addId([{ heading: `corge`, id: `foo`, message: `bar` }])
    ).toMatchObject([{ heading: `corge`, id: `foo`, message: `bar` }]);
    expect(
      addId([
        { heading: `baz`, id: `qui`, message: `qux` },
        { heading: `thud`, message: `corge` }
      ])
    ).toMatchObject([
      { heading: `baz`, id: `qui`, message: `qux` },
      { heading: `thud`, id: `${NAMESPACE}-4`, message: `corge` }
    ]);
  });
});
